package com.TTCD2.Project4.dto;

import java.time.LocalDateTime;
import java.util.List;

public class OrderDTO {
    private Integer orderId;
    private Integer userId;
    private String username; // Thêm trường này
    private Double totalPrice;
    private String orderStatus;
    private LocalDateTime createdAt;
    private List<OrderDetailDTO> orderDetails;

    // Getters and Setters
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

    public List<OrderDetailDTO> getOrderDetails() { return orderDetails; }
    public void setOrderDetails(List<OrderDetailDTO> orderDetails) { this.orderDetails = orderDetails; }
}