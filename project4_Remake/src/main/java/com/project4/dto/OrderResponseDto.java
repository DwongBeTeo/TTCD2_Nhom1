package com.project4.dto;

import com.project4.entity.Order;

import java.time.LocalDateTime;
import java.util.List;

public class OrderResponseDto {
    private Integer orderId;
    private Integer userId;
    private String username; // Chỉ cho admin
    private Double totalPrice;
    private String orderStatus;
    private LocalDateTime createdAt;
    private List<OrderDetailDto> orderDetails;

    public OrderResponseDto(Order order, List<OrderDetailDto> orderDetails) {
        this.orderId = order.getOrderId();
        this.userId = order.getUserId();
        this.totalPrice = order.getTotalPrice();
        this.orderStatus = order.getOrderStatus().name();
        this.createdAt = order.getCreatedAt();
        this.orderDetails = orderDetails;
    }

    public OrderResponseDto(Order order, List<OrderDetailDto> orderDetails, String username) {
        this(order, orderDetails);
        this.username = username;
    }

    // Getters và Setters
    public Integer getOrderId() { return orderId; }
    public void setOrderId(Integer orderId) { this.orderId = orderId; }
    public Integer getUserId() { return userId; }
    public void setUserId(Integer userId) { this.userId = userId; }
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
    public Double getTotalPrice() { return totalPrice; }
    public void setTotalPrice(Double totalPrice) { this.totalPrice = totalPrice; }
    public String getOrderStatus() { return orderStatus; }
    public void setOrderStatus(String orderStatus) { this.orderStatus = orderStatus; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    public List<OrderDetailDto> getOrderDetails() { return orderDetails; }
    public void setOrderDetails(List<OrderDetailDto> orderDetails) { this.orderDetails = orderDetails; }
}