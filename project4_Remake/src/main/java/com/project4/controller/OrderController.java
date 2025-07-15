package com.project4.controller;

import com.project4.dto.CheckoutRequestDto;
import com.project4.dto.OrderResponseDto;
import com.project4.entity.Order;
import com.project4.entity.OrderDetail;
import com.project4.entity.User;
import com.project4.repository.OrderRepository;
import com.project4.repository.OrderDetailRepository;
import com.project4.repository.UserRepository;
import com.project4.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @Autowired
    private UserRepository userRepository;


    @PostMapping("/checkout")
    public ResponseEntity<?> checkout(@RequestBody CheckoutRequestDto request) {
        boolean isBuyer = SecurityContextHolder.getContext().getAuthentication().getAuthorities()
                .contains(new SimpleGrantedAuthority("ROLE_buyer"));
        if (!isBuyer) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Access denied: Buyer role required");
        }

        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Optional<User> user = userRepository.findByUsername(username);
        if (user.isEmpty() || !user.get().getUserId().equals(request.getUserId())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid user ID");
        }

        try {
            OrderResponseDto response = orderService.checkout(request);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    // Buyer xem lịch sử mua hàng của chính mình
    @GetMapping("/orders")
    public ResponseEntity<?> getMyOrders() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Optional<com.project4.entity.User> user = userRepository.findByUsername(username);
        if (user.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User not found");
        }

        List<OrderResponseDto> orderResponses = orderService.getOrdersByUserId(user.get().getUserId());
        return ResponseEntity.ok(orderResponses);
    }

    // Admin xem lịch sử mua hàng của user bất kỳ
    @GetMapping("/orders/{userId}")
    public ResponseEntity<?> getOrdersByUserId(@PathVariable Integer userId) {
        boolean isAdmin = SecurityContextHolder.getContext().getAuthentication().getAuthorities()
                .contains(new SimpleGrantedAuthority("ROLE_admin"));
        if (!isAdmin) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Access denied: Admin role required");
        }

        Optional<com.project4.entity.User> user = userRepository.findById(userId);
        if (user.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User not found");
        }

        List<OrderResponseDto> orderResponses = orderService.getOrdersByUserId(userId);
        return ResponseEntity.ok(orderResponses);
    }

    // Admin xem lịch sử mua hàng của tất cả khách hàng
    @GetMapping("/admin/orders")
    public ResponseEntity<?> getAllOrders() {
        boolean isAdmin = SecurityContextHolder.getContext().getAuthentication().getAuthorities()
                .contains(new SimpleGrantedAuthority("ROLE_admin"));
        if (!isAdmin) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Access denied: Admin role required");
        }

        List<OrderResponseDto> orderResponses = orderService.getAllOrders();
        return ResponseEntity.ok(orderResponses);
    }

    // Admin xem danh sách người dùng đã đặt hàng
    @GetMapping("/admin/users-with-orders")
    public ResponseEntity<?> getUsersWithOrders() {
        boolean isAdmin = SecurityContextHolder.getContext().getAuthentication().getAuthorities()
                .contains(new SimpleGrantedAuthority("ROLE_admin"));
        if (!isAdmin) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Access denied: Admin role required");
        }

        List<OrderService.UserDto> users = orderService.getUsersWithOrders();
        return ResponseEntity.ok(users);
    }
}

class OrderResponse {
    private Integer orderId;
    private Integer userId;
    private Double totalPrice;
    private String orderStatus;
    private LocalDateTime createdAt;
    private List<OrderDetail> orderDetails;

    public OrderResponse(Order order, List<OrderDetail> orderDetails) {
        this.orderId = order.getOrderId();
        this.userId = order.getUserId();
        this.totalPrice = order.getTotalPrice();
        this.orderStatus = order.getOrderStatus().name();
        this.createdAt = order.getCreatedAt();
        this.orderDetails = orderDetails;
    }

    // Getters và Setters
    public Integer getOrderId() { return orderId; }
    public void setOrderId(Integer orderId) { this.orderId = orderId; }
    public Integer getUserId() { return userId; }
    public void setUserId(Integer userId) { this.userId = userId; }
    public Double getTotalPrice() { return totalPrice; }
    public void setTotalPrice(Double totalPrice) { this.totalPrice = totalPrice; }
    public String getOrderStatus() { return orderStatus; }
    public void setOrderStatus(String orderStatus) { this.orderStatus = orderStatus; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    public List<OrderDetail> getOrderDetails() { return orderDetails; }
    public void setOrderDetails(List<OrderDetail> orderDetails) { this.orderDetails = orderDetails; }
}