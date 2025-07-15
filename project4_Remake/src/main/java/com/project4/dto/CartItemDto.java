package com.project4.dto;

public class CartItemDto {
    private Integer cartId;
    private Integer gameId;
    private Integer accountId;
    private Integer quantity;
    private Double price;
    private Integer inventoryQuantity;

    public CartItemDto(Integer cartId, Integer gameId, Integer accountId, Integer quantity, Double price, Integer inventoryQuantity) {
        this.cartId = cartId;
        this.gameId = gameId;
        this.accountId = accountId;
        this.quantity = quantity;
        this.price = price;
        this.inventoryQuantity = inventoryQuantity;
    }

    // Getters và Setters
    public Integer getCartId() { return cartId; }
    public void setCartId(Integer cartId) { this.cartId = cartId; }
    public Integer getGameId() { return gameId; }
    public void setGameId(Integer gameId) { this.gameId = gameId; }
    public Integer getAccountId() { return accountId; }
    public void setAccountId(Integer accountId) { this.accountId = accountId; }
    public Integer getQuantity() { return quantity; }
    public void setQuantity(Integer quantity) { this.quantity = quantity; }
    public Double getPrice() { return price; }
    public void setPrice(Double price) { this.price = price; }
    public Integer getInventoryQuantity() { return inventoryQuantity; }
    public void setInventoryQuantity(Integer inventoryQuantity) { this.inventoryQuantity = inventoryQuantity; }
}