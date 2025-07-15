package com.project4.service;

import com.project4.dto.CheckoutRequestDto;
import com.project4.dto.OrderDetailDto;
import com.project4.dto.OrderResponseDto;
import com.project4.entity.Order;
import com.project4.entity.OrderDetail;
import com.project4.entity.ValorantAccount;
import com.project4.repository.OrderRepository;
import com.project4.repository.OrderDetailRepository;
import com.project4.repository.UserRepository;
import com.project4.repository.ValorantAccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderDetailRepository orderDetailRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CartService cartService;

    @Autowired
    private ValorantAccountRepository valorantAccountRepository;

    public List<OrderResponseDto> getOrdersByUserId(Integer userId) {
        List<Order> orders = orderRepository.findByUserId(userId);
        List<OrderResponseDto> orderResponses = new ArrayList<>();
        for (Order order : orders) {
            List<OrderDetail> details = orderDetailRepository.findByOrderId(order.getOrderId());
            List<OrderDetailDto> detailDtos = new ArrayList<>();
            for (OrderDetail detail : details) {
                Optional<ValorantAccount> account = valorantAccountRepository.findById(detail.getAccountId());
                String usernameValorant = account.map(ValorantAccount::getUsernameValorant).orElse("N/A");
                String passwordValorant = account.map(ValorantAccount::getPasswordValorant).orElse("N/A");
                detailDtos.add(new OrderDetailDto(
                        detail.getOrderDetailId(),
                        detail.getGameId(),
                        detail.getAccountId(),
                        detail.getQuantity(),
                        detail.getPrice(),
                        detail.getGameName(),
                        detail.getDescription(),
                        usernameValorant,
                        passwordValorant
                ));
            }
            orderResponses.add(new OrderResponseDto(order, detailDtos));
        }
        return orderResponses;
    }

    public List<OrderResponseDto> getAllOrders() {
        List<Order> orders = orderRepository.findAll();
        List<OrderResponseDto> orderResponses = new ArrayList<>();
        for (Order order : orders) {
            List<OrderDetail> details = orderDetailRepository.findByOrderId(order.getOrderId());
            List<OrderDetailDto> detailDtos = new ArrayList<>();
            for (OrderDetail detail : details) {
                Optional<ValorantAccount> account = valorantAccountRepository.findById(detail.getAccountId());
                String usernameValorant = account.map(ValorantAccount::getUsernameValorant).orElse("N/A");
                String passwordValorant = account.map(ValorantAccount::getPasswordValorant).orElse("N/A");
                detailDtos.add(new OrderDetailDto(
                        detail.getOrderDetailId(),
                        detail.getGameId(),
                        detail.getAccountId(),
                        detail.getQuantity(),
                        detail.getPrice(),
                        detail.getGameName(),
                        detail.getDescription(),
                        usernameValorant,
                        passwordValorant
                ));
            }
            Optional<com.project4.entity.User> user = userRepository.findById(order.getUserId());
            String username = user.map(com.project4.entity.User::getUsername).orElse("N/A");
            orderResponses.add(new OrderResponseDto(order, detailDtos, username));
        }
        return orderResponses;
    }

    public List<UserDto> getUsersWithOrders() {
        List<Order> orders = orderRepository.findAll();
        return orders.stream()
                .map(Order::getUserId)
                .distinct()
                .map(userId -> {
                    Optional<com.project4.entity.User> user = userRepository.findById(userId);
                    return new UserDto(userId, user.map(com.project4.entity.User::getUsername).orElse("N/A"));
                })
                .collect(Collectors.toList());
    }

    @Transactional
    public OrderResponseDto checkout(CheckoutRequestDto request) {
        // Kiểm tra số lượng tồn kho
        for (CheckoutRequestDto.CartItemDto item : request.getItems()) {
            Optional<ValorantAccount> account = valorantAccountRepository.findById(item.getAccountId());
            if (account.isEmpty() || account.get().getStatus() != ValorantAccount.Status.available) {
                throw new RuntimeException("Tài khoản " + item.getAccountId() + " không khả dụng");
            }
            if (account.get().getInventoryQuantity() < item.getQuantity()) {
                throw new RuntimeException("Không đủ số lượng tồn kho cho tài khoản " + item.getAccountId() + ": chỉ còn " + account.get().getInventoryQuantity());
            }
        }

        // Tạo đơn hàng
        Order order = new Order();
        order.setUserId(request.getUserId());
        order.setTotalPrice(request.getItems().stream()
                .mapToDouble(item -> item.getPrice() * item.getQuantity())
                .sum());
        order.setOrderStatus(Order.Status.valueOf("completed"));
        order.setCreatedAt(LocalDateTime.now());
        order = orderRepository.save(order);

        // Tạo chi tiết đơn hàng và cập nhật tồn kho
        List<OrderDetailDto> detailDtos = new ArrayList<>();
        for (CheckoutRequestDto.CartItemDto item : request.getItems()) {
            OrderDetail detail = new OrderDetail();
            detail.setOrderId(order.getOrderId());
            detail.setGameId(item.getGameId());
            detail.setAccountId(item.getAccountId());
            detail.setQuantity(item.getQuantity());
            detail.setPrice(item.getPrice());
            detail.setGameName(item.getGameName());
            detail.setDescription(item.getDescription());
            orderDetailRepository.save(detail);

            Optional<ValorantAccount> account = valorantAccountRepository.findById(item.getAccountId());
            String usernameValorant = account.map(ValorantAccount::getUsernameValorant).orElse("N/A");
            String passwordValorant = account.map(ValorantAccount::getPasswordValorant).orElse("N/A");
            detailDtos.add(new OrderDetailDto(
                    detail.getOrderDetailId(),
                    detail.getGameId(),
                    detail.getAccountId(),
                    detail.getQuantity(),
                    detail.getPrice(),
                    detail.getGameName(),
                    detail.getDescription(),
                    usernameValorant,
                    passwordValorant
            ));

            // Cập nhật inventory_quantity
            int newQuantity = account.get().getInventoryQuantity() - item.getQuantity();
            valorantAccountRepository.updateInventoryQuantity(item.getAccountId(), newQuantity);
            if (newQuantity == 0) {
                valorantAccountRepository.updateStatus(item.getAccountId(), ValorantAccount.Status.sold);
            }
        }

        // Xóa giỏ hàng
        cartService.clearCart(request.getUserId());

        // Trả về OrderResponseDto
        Optional<com.project4.entity.User> user = userRepository.findById(request.getUserId());
        String username = user.map(com.project4.entity.User::getUsername).orElse("N/A");
        return new OrderResponseDto(order, detailDtos, username);
    }

    public static class UserDto {
        private Integer userId;
        private String username;

        public UserDto(Integer userId, String username) {
            this.userId = userId;
            this.username = username;
        }

        // Getters và Setters
        public Integer getUserId() { return userId; }
        public void setUserId(Integer userId) { this.userId = userId; }
        public String getUsername() { return username; }
        public void setUsername(String username) { this.username = username; }
    }
}