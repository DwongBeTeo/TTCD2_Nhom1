package com.TTCD2.Project4.service;

import java.math.BigDecimal;
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
import com.TTCD2.Project4.entity.PUBGAccount;
import com.TTCD2.Project4.entity.ValorantAccount;
import com.TTCD2.Project4.repository.CartRepository;
import com.TTCD2.Project4.repository.LienQuanAccountRepository;
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

    @Transactional
    // Thêm sản phẩm vào giỏ hàng
    public void addToCart(Integer userId, Integer gameId, Integer accountId) {
    	// Kiểm tra số lượng tồn trước khi thêm
        Integer inventoryQuantity = checkInventoryQuantity(gameId, accountId);
        if (inventoryQuantity == null || inventoryQuantity <= 0) {
            // Có thể ném exception hoặc xử lý theo cách khác (ví dụ: thông báo lỗi)
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
            cartItem.setQuantity(cartItem.getQuantity() + 1);
            cartRepository.save(cartItem);
            // Giảm inventory_quantity khi tăng số lượng trong giỏ hàng
            reduceInventoryQuantity(gameId, accountId);
        } else {
            Cart cartItem = new Cart();
            cartItem.setUserId(userId);
            cartItem.setGameId(gameId);
            cartItem.setAccountId(accountId);
            cartItem.setQuantity(1);
            cartRepository.save(cartItem);
            // Giảm inventory_quantity khi thêm mới vào giỏ hàng
            reduceInventoryQuantity(gameId, accountId);
        }
    }
    
    @Transactional
    public void removeFromCart(Integer cartId, Integer userId) {
        Optional<Cart> cartItem = cartRepository.findById(cartId);
        if (cartItem.isPresent() && cartItem.get().getUserId().equals(userId)) {
            Integer gameId = cartItem.get().getGameId();
            Integer accountId = cartItem.get().getAccountId();
            cartRepository.deleteById(cartId);
            // Tăng lại inventory_quantity khi xóa khỏi giỏ hàng
            increaseInventoryQuantity(gameId, accountId);
        }
    }

    // Lấy danh sách sản phẩm trong giỏ hàng của user
    public List<Cart> getCartItemsByUserId(Integer userId) {
        return cartRepository.findByUserId(userId);
    }
    
 // Lấy danh sách sản phẩm trong giỏ hàng kèm chi tiết và tính tổng tiền
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

         // Lấy chi tiết tài khoản dựa trên gameId
            if (item.getGameId() == 1) { // Liên Quân
                Optional<LienQuanAccount> account = lienQuanAccountRepository.findById(item.getAccountId());
                if (account.isPresent()) {
                    LienQuanAccount acc = account.get();
                    dto.setGameName("Liên Quân");
                    dto.setPrice(acc.getPrice());
                    dto.setDescription(acc.getDescription());
                    totalPrice += acc.getPrice() * item.getQuantity(); // Cập nhật totalPrice bên ngoài lambda
                }
            } else if (item.getGameId() == 2) { // Valorant
                Optional<ValorantAccount> account = valorantAccountRepository.findById(item.getAccountId());
                if (account.isPresent()) {
                    ValorantAccount acc = account.get();
                    dto.setGameName("Valorant");
                    dto.setPrice(acc.getPrice());
                    dto.setDescription(acc.getDescription());
                    totalPrice += acc.getPrice() * item.getQuantity(); // Cập nhật totalPrice bên ngoài lambda
                }
            } else if (item.getGameId() == 3) { // PUBG
                Optional<PUBGAccount> account = pubgAccountRepository.findById(item.getAccountId());
                if (account.isPresent()) {
                    PUBGAccount acc = account.get();
                    dto.setGameName("PUBG");
                    dto.setPrice(acc.getPrice());
                    dto.setDescription(acc.getDescription());
                    totalPrice += acc.getPrice() * item.getQuantity(); // Cập nhật totalPrice bên ngoài lambda
                }
            }
            cartItemDTOs.add(dto);
        }

        CartSummaryDTO summary = new CartSummaryDTO();
        summary.setCartItems(cartItemDTOs);
        summary.setTotalPrice(totalPrice);
        return summary;
    }
    
 // Phương thức kiểm tra số lượng tồn
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
    
 // Phương thức giảm số lượng tồn
    private void reduceInventoryQuantity(Integer gameId, Integer accountId) {
        if (gameId == 1) {
            lienQuanAccountRepository.findById(accountId).ifPresent(acc -> {
                acc.setInventoryQuantity(acc.getInventoryQuantity() - 1);
                lienQuanAccountRepository.save(acc);
            });
        } else if (gameId == 2) {
            valorantAccountRepository.findById(accountId).ifPresent(acc -> {
                acc.setInventoryQuantity(acc.getInventoryQuantity() - 1);
                valorantAccountRepository.save(acc);
            });
        } else if (gameId == 3) {
            pubgAccountRepository.findById(accountId).ifPresent(acc -> {
                acc.setInventoryQuantity(acc.getInventoryQuantity() - 1);
                pubgAccountRepository.save(acc);
            });
        }
    }

    // Phương thức tăng số lượng tồn khi xóa khỏi giỏ hàng
    private void increaseInventoryQuantity(Integer gameId, Integer accountId) {
        if (gameId == 1) {
            lienQuanAccountRepository.findById(accountId).ifPresent(acc -> {
                acc.setInventoryQuantity(acc.getInventoryQuantity() + 1);
                lienQuanAccountRepository.save(acc);
            });
        } else if (gameId == 2) {
            valorantAccountRepository.findById(accountId).ifPresent(acc -> {
                acc.setInventoryQuantity(acc.getInventoryQuantity() + 1);
                valorantAccountRepository.save(acc);
            });
        } else if (gameId == 3) {
            pubgAccountRepository.findById(accountId).ifPresent(acc -> {
                acc.setInventoryQuantity(acc.getInventoryQuantity() + 1);
                pubgAccountRepository.save(acc);
            });
        }
    }
}
