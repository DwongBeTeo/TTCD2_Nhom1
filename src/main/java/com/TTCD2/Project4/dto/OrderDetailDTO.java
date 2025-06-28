package com.TTCD2.Project4.dto;

public class OrderDetailDTO {
    private Integer orderDetailId;
    private Integer gameId;
    private Integer accountId;
    private Integer quantity;
    private Double price;
    private String gameName;
    private String description;
    private String usernameValorant; // Thêm trường tài khoản
    private String passwordValorant; // Thêm trường mật khẩu

    // Getters and Setters
    public Integer getOrderDetailId() { return orderDetailId; }
    public void setOrderDetailId(Integer orderDetailId) { this.orderDetailId = orderDetailId; }

    public Integer getGameId() { return gameId; }
    public void setGameId(Integer gameId) { this.gameId = gameId; }

    public Integer getAccountId() { return accountId; }
    public void setAccountId(Integer accountId) { this.accountId = accountId; }

    public Integer getQuantity() { return quantity; }
    public void setQuantity(Integer quantity) { this.quantity = quantity; }

    public Double getPrice() { return price; }
    public void setPrice(Double price) { this.price = price; }

    public String getGameName() { return gameName; }
    public void setGameName(String gameName) { this.gameName = gameName; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    
    public String getUsernameValorant() { return usernameValorant; }
    public void setUsernameValorant(String usernameValorant) { this.usernameValorant = usernameValorant; }

    public String getPasswordValorant() { return passwordValorant; }
    public void setPasswordValorant(String passwordValorant) { this.passwordValorant = passwordValorant; }
}