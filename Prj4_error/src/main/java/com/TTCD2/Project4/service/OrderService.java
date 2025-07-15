package com.TTCD2.Project4.service;

import com.TTCD2.Project4.dto.OrderDTO;
import com.TTCD2.Project4.dto.OrderDetailDTO;
import com.TTCD2.Project4.entity.Order;
import com.TTCD2.Project4.entity.OrderDetail;
import com.TTCD2.Project4.repository.OrderRepository;
import com.TTCD2.Project4.repository.UsersRepository;
import com.TTCD2.Project4.repository.ValorantAccountRepository;
import com.TTCD2.Project4.repository.OrderDetailRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderDetailRepository orderDetailRepository;
    
    @Autowired
    private UsersRepository userRepository;

    @Autowired
    private ValorantAccountRepository valorantAccountRepository;

    public List<OrderDTO> getOrdersByUserId(Integer userId) {
        List<Order> orders = orderRepository.findByUserId(userId);
        return orders.stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    public List<OrderDTO> getAllOrders() {
        List<Order> orders = orderRepository.findAll();
        return orders.stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    private OrderDTO convertToDTO(Order order) {
    	OrderDTO dto = new OrderDTO();
        dto.setOrderId(order.getOrderId());
        dto.setUserId(order.getUserId());
        // Lấy username từ UserRepository
        userRepository.findByUserId(order.getUserId())
                .ifPresent(user -> dto.setUsername(user.getUsername()));
        dto.setTotalPrice(order.getTotalPrice());
        dto.setOrderStatus(order.getOrderStatus().name());
        dto.setCreatedAt(order.getCreatedAt());

        List<OrderDetail> details = orderDetailRepository.findByOrderId(order.getOrderId());
        List<OrderDetailDTO> detailDTOs = details.stream().map(detail -> {
            OrderDetailDTO detailDTO = new OrderDetailDTO();
            detailDTO.setOrderDetailId(detail.getOrderDetailId());
            detailDTO.setGameId(detail.getGameId());
            detailDTO.setAccountId(detail.getAccountId());
            detailDTO.setQuantity(detail.getQuantity());
            detailDTO.setPrice(detail.getPrice());
            detailDTO.setGameName(detail.getGameName());
            detailDTO.setDescription(detail.getDescription());
            // Lấy thông tin tài khoản và mật khẩu từ ValorantAccount
            valorantAccountRepository.findById(detail.getAccountId())
                    .ifPresent(account -> {
                        detailDTO.setUsernameValorant(account.getUsernameValorant());
                        detailDTO.setPasswordValorant(account.getPasswordValorant());
                    });
            return detailDTO;
        }).collect(Collectors.toList());

        dto.setOrderDetails(detailDTOs);
        return dto;
    }
}