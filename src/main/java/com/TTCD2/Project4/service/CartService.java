package com.TTCD2.Project4.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.TTCD2.Project4.dto.CartItemDTO;
import com.TTCD2.Project4.dto.CartSummaryDTO;
import com.TTCD2.Project4.entity.Cart;
import com.TTCD2.Project4.entity.LienQuanAccount;
import com.TTCD2.Project4.entity.Order;
import com.TTCD2.Project4.entity.OrderDetail;
import com.TTCD2.Project4.entity.PUBGAccount;
import com.TTCD2.Project4.entity.ValorantAccount;
import com.TTCD2.Project4.repository.CartRepository;
import com.TTCD2.Project4.repository.LienQuanAccountRepository;
import com.TTCD2.Project4.repository.OrderDetailRepository;
import com.TTCD2.Project4.repository.OrderRepository;
import com.TTCD2.Project4.repository.PUBGAccountRepository;
import com.TTCD2.Project4.repository.ValorantAccountRepository;

@Service
public class CartService {
    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private LienQuanAccountRepository lienQuanAccountRepository;

    @Autowired
    private ValorantAccountRepository valorantAccountRepository;

    @Autowired
    private PUBGAccountRepository pubgAccountRepository;
    
    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderDetailRepository orderDetailRepository;

    @Transactional
    public void addToCart(Integer userId, Integer gameId, Integer accountId) {
        // Kiểm tra số lượng tồn trước khi thêm
        Integer inventoryQuantity = checkInventoryQuantity(gameId, accountId);
        if (inventoryQuantity == null || inventoryQuantity <= 0) {
            throw new IllegalStateException("Số lượng tồn đã hết cho tài khoản này!");
        }

        // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
        Optional<Cart> existingCartItem = cartRepository.findByUserIdAndGameIdAndAccountId(userId, gameId, accountId);
        if (existingCartItem.isPresent()) {
            Cart cartItem = existingCartItem.get();
            int currentQuantity = cartItem.getQuantity();
            if (currentQuantity >= inventoryQuantity) {
                throw new IllegalStateException("Số lượng trong giỏ hàng đã đạt giới hạn tồn kho!");
            }
            cartItem.setQuantity(currentQuantity + 1);
            cartItem.setAddedAt(LocalDateTime.now()); // Cập nhật thời gian thêm
            cartRepository.save(cartItem);
        } else {
            Cart cartItem = new Cart();
            cartItem.setUserId(userId);
            cartItem.setGameId(gameId);
            cartItem.setAccountId(accountId);
            cartItem.setQuantity(1);
            cartItem.setAddedAt(LocalDateTime.now()); // Gán thời gian thêm
            cartRepository.save(cartItem);
        }
    }

    @Transactional
    public void removeFromCart(Integer cartId, Integer userId) {
        Optional<Cart> cartItem = cartRepository.findById(cartId);
        if (cartItem.isPresent() && cartItem.get().getUserId().equals(userId)) {
            cartRepository.deleteById(cartId);
            // Không tăng inventoryQuantity khi xóa
        }
    }

    @Transactional
    public void processCheckout(Integer userId) {
        List<Cart> cartItems = cartRepository.findByUserId(userId);
        if (cartItems.isEmpty()) {
            throw new IllegalStateException("Giỏ hàng trống, không thể thanh toán!");
        }

        // Tạo đơn hàng mới
        CartSummaryDTO cartSummary = getCartItemsWithDetails(userId);
        Order order = new Order();
        order.setUserId(userId);
        order.setTotalPrice(cartSummary.getTotalPrice());
        order.setOrderStatus(Order.OrderStatus.completed); // Hoặc pending nếu cần xác nhận
        order.setCreatedAt(LocalDateTime.now());
        order = orderRepository.save(order);

        // Tạo chi tiết đơn hàng
        for (CartItemDTO item : cartSummary.getCartItems()) {
            Integer inventoryQuantity = checkInventoryQuantity(item.getGameId(), item.getAccountId());
            if (inventoryQuantity == null || inventoryQuantity < item.getQuantity()) {
                throw new IllegalStateException("Số lượng tồn không đủ cho tài khoản: " + item.getAccountId());
            }

            OrderDetail detail = new OrderDetail();
            detail.setOrderId(order.getOrderId());
            detail.setGameId(item.getGameId());
            detail.setAccountId(item.getAccountId());
            detail.setQuantity(item.getQuantity());
            detail.setPrice(item.getPrice());
            detail.setGameName(item.getGameName());
            detail.setDescription(item.getDescription());
            orderDetailRepository.save(detail);

            // Trừ số lượng tồn
            reduceInventoryQuantity(item.getGameId(), item.getAccountId(), item.getQuantity());
        }

        // Xóa giỏ hàng
        cartRepository.deleteAll(cartItems);
    }

    public List<Cart> getCartItemsByUserId(Integer userId) {
        return cartRepository.findByUserId(userId);
    }

    public CartSummaryDTO getCartItemsWithDetails(Integer userId) {
        List<Cart> cartItems = cartRepository.findByUserId(userId);
        List<CartItemDTO> cartItemDTOs = new ArrayList<>();
        Double totalPrice = 0.0;

        for (Cart item : cartItems) {
            CartItemDTO dto = new CartItemDTO();
            dto.setCartId(item.getCartId());
            dto.setGameId(item.getGameId());
            dto.setAccountId(item.getAccountId());
            dto.setQuantity(item.getQuantity());

            if (item.getGameId() == 1) { // Liên Quân
                Optional<LienQuanAccount> account = lienQuanAccountRepository.findById(item.getAccountId());
                if (account.isPresent()) {
                    LienQuanAccount acc = account.get();
                    dto.setGameName("Liên Quân");
                    dto.setPrice(acc.getPrice());
                    dto.setDescription(acc.getDescription());
                    totalPrice += acc.getPrice() * item.getQuantity();
                }
            } else if (item.getGameId() == 2) { // Valorant
                Optional<ValorantAccount> account = valorantAccountRepository.findById(item.getAccountId());
                if (account.isPresent()) {
                    ValorantAccount acc = account.get();
                    dto.setGameName("Valorant");
                    dto.setPrice(acc.getPrice());
                    dto.setDescription(acc.getDescription());
                    totalPrice += acc.getPrice() * item.getQuantity();
                }
            } else if (item.getGameId() == 3) { // PUBG
                Optional<PUBGAccount> account = pubgAccountRepository.findById(item.getAccountId());
                if (account.isPresent()) {
                    PUBGAccount acc = account.get();
                    dto.setGameName("PUBG");
                    dto.setPrice(acc.getPrice());
                    dto.setDescription(acc.getDescription());
                    totalPrice += acc.getPrice() * item.getQuantity();
                }
            }
            cartItemDTOs.add(dto);
        }

        CartSummaryDTO summary = new CartSummaryDTO();
        summary.setCartItems(cartItemDTOs);
        summary.setTotalPrice(totalPrice);
        return summary;
    }

    private Integer checkInventoryQuantity(Integer gameId, Integer accountId) {
        if (gameId == 1) {
            return lienQuanAccountRepository.findById(accountId)
                    .map(LienQuanAccount::getInventoryQuantity)
                    .orElse(0);
        } else if (gameId == 2) {
            return valorantAccountRepository.findById(accountId)
                    .map(ValorantAccount::getInventoryQuantity)
                    .orElse(0);
        } else if (gameId == 3) {
            return pubgAccountRepository.findById(accountId)
                    .map(PUBGAccount::getInventoryQuantity)
                    .orElse(0);
        }
        return 0;
    }

    private void reduceInventoryQuantity(Integer gameId, Integer accountId, Integer quantity) {
        if (gameId == 1) {
            lienQuanAccountRepository.findById(accountId).ifPresent(acc -> {
                acc.setInventoryQuantity(acc.getInventoryQuantity() - quantity);
                lienQuanAccountRepository.save(acc);
            });
        } else if (gameId == 2) {
            valorantAccountRepository.findById(accountId).ifPresent(acc -> {
                acc.setInventoryQuantity(acc.getInventoryQuantity() - quantity);
                valorantAccountRepository.save(acc);
            });
        } else if (gameId == 3) {
            pubgAccountRepository.findById(accountId).ifPresent(acc -> {
                acc.setInventoryQuantity(acc.getInventoryQuantity() - quantity);
                pubgAccountRepository.save(acc);
            });
        }
    }

    // Giữ phương thức này để sử dụng trong các trường hợp khác (nếu cần)
    private void increaseInventoryQuantity(Integer gameId, Integer accountId, Integer quantity) {
        if (gameId == 1) {
            lienQuanAccountRepository.findById(accountId).ifPresent(acc -> {
                acc.setInventoryQuantity(acc.getInventoryQuantity() + quantity);
                lienQuanAccountRepository.save(acc);
            });
        } else if (gameId == 2) {
            valorantAccountRepository.findById(accountId).ifPresent(acc -> {
                acc.setInventoryQuantity(acc.getInventoryQuantity() + quantity);
                valorantAccountRepository.save(acc);
            });
        } else if (gameId == 3) {
            pubgAccountRepository.findById(accountId).ifPresent(acc -> {
                acc.setInventoryQuantity(acc.getInventoryQuantity() + quantity);
                pubgAccountRepository.save(acc);
            });
        }
    }
}