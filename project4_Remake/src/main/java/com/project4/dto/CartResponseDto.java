package com.project4.dto;

import java.util.List;

public class CartResponseDto {
    private List<CartItemDto> items;
    private Double total;

    public CartResponseDto(List<CartItemDto> items, Double total) {
        this.items = items;
        this.total = total;
    }

    // Getters và Setters
    public List<CartItemDto> getItems() { return items; }
    public void setItems(List<CartItemDto> items) { this.items = items; }
    public Double getTotal() { return total; }
    public void setTotal(Double total) { this.total = total; }
}
