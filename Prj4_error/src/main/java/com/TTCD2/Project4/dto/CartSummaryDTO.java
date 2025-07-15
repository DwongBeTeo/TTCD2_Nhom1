package com.TTCD2.Project4.dto;

import java.util.List;

public class CartSummaryDTO {
	private List<CartItemDTO> cartItems;
    private Double totalPrice;

    // Getters and Setters
    public List<CartItemDTO> getCartItems() {
        return cartItems;
    }

    public void setCartItems(List<CartItemDTO> cartItems) {
        this.cartItems = cartItems;
    }

    public Double getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(Double totalPrice) {
        this.totalPrice = totalPrice;
    }
}
