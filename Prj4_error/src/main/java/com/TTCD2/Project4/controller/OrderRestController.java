package com.TTCD2.Project4.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.TTCD2.Project4.dto.OrderDTO;
import com.TTCD2.Project4.entity.Users;
import com.TTCD2.Project4.repository.UsersRepository;
import com.TTCD2.Project4.service.OrderService;

@RestController
@RequestMapping("/api/orders")
public class OrderRestController {
	@Autowired
    private UsersRepository userRepository;

    @Autowired
    private OrderService orderService;

    @GetMapping("/public")
    public ResponseEntity<?> getUserOrders(Authentication authentication) {
        try {
            String username = authentication.getName();
            Users user = userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalStateException("Người dùng không tồn tại"));

            List<OrderDTO> orders = orderService.getOrdersByUserId(user.getUserId());
            return ResponseEntity.ok(orders);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Lỗi khi tải đơn hàng: " + e.getMessage());
        }
    }
}
