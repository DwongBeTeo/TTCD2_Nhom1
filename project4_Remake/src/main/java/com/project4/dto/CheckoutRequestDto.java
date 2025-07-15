package com.project4.dto;

import java.util.List;

public class CheckoutRequestDto {
    private Integer userId;
    private List<CartItemDto> items;

    public static class CartItemDto {
        private Integer cartId;
        private Integer gameId;
        private Integer accountId;
        private Integer quantity;
        private Double price;
        private String gameName;
        private String description;

        public CartItemDto() {}

        public CartItemDto(Integer cartId, Integer gameId, Integer accountId, Integer quantity, Double price, String gameName, String description) {
            this.cartId = cartId;
            this.gameId = gameId;
            this.accountId = accountId;
            this.quantity = quantity;
            this.price = price;
            this.gameName = gameName;
            this.description = description;
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
        public String getGameName() { return gameName; }
        public void setGameName(String gameName) { this.gameName = gameName; }
        public String getDescription() { return description; }
        public void setDescription(String description) { this.description = description; }
    }

    // Getters và Setters
    public Integer getUserId() { return userId; }
    public void setUserId(Integer userId) { this.userId = userId; }
    public List<CartItemDto> getItems() { return items; }
    public void setItems(List<CartItemDto> items) { this.items = items; }
}