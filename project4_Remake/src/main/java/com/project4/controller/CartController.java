package com.project4.controller;

import com.project4.dto.CartResponseDto;
import com.project4.entity.Cart;
import com.project4.service.CartService;
import com.project4.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    @Autowired
    private CartService cartService;

    @Autowired
    private UserRepository userRepository;

    @PostMapping
    public ResponseEntity<?> addToCart(@RequestBody CartRequest cartRequest) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Optional<com.project4.entity.User> user = userRepository.findByUsername(username);
        if (user.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User not found");
        }

        try {
            Cart cart = cartService.addToCart(user.get().getUserId(), cartRequest.getGameId(), cartRequest.getAccountId(), cartRequest.getQuantity());
            return ResponseEntity.ok("Added to cart successfully");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<?> getCart(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Optional<com.project4.entity.User> user = userRepository.findByUsername(username);
        if (user.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User not found");
        }

        Pageable pageable = PageRequest.of(page, size);
        CartResponseDto cartResponse = cartService.getCart(user.get().getUserId(), pageable);
        return ResponseEntity.ok(cartResponse);
    }

    @PutMapping("/{gameId}/{accountId}")
    public ResponseEntity<?> updateCart(@PathVariable Integer gameId, @PathVariable Integer accountId, @RequestBody CartRequest cartRequest) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Optional<com.project4.entity.User> user = userRepository.findByUsername(username);
        if (user.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User not found");
        }

        System.out.println("UpdateCart called:");
        System.out.println("  Path - gameId: " + gameId + ", accountId: " + accountId);
        System.out.println("  Body - quantity: " + cartRequest.getQuantity());

        try {
            Cart cart = cartService.updateCart(user.get().getUserId(), gameId, accountId, cartRequest.getQuantity());
            if (cart == null) {
                return ResponseEntity.ok("Item removed from cart");
            }
            return ResponseEntity.ok("Cart updated successfully");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("ERROR: " + e.getMessage());
        }
    }

    @DeleteMapping("/{gameId}/{accountId}")
    public ResponseEntity<?> deleteCartItem(@PathVariable Integer gameId, @PathVariable Integer accountId) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Optional<com.project4.entity.User> user = userRepository.findByUsername(username);
        if (user.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User not found");
        }

        try {
            cartService.deleteCartItem(user.get().getUserId(), gameId, accountId);
            return ResponseEntity.ok("Item removed from cart");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @DeleteMapping
    public ResponseEntity<?> clearCart() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Optional<com.project4.entity.User> user = userRepository.findByUsername(username);
        if (user.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User not found");
        }

        cartService.clearCart(user.get().getUserId());
        return ResponseEntity.ok("Cart cleared successfully");
    }
}

class CartRequest {
    private Integer gameId;
    private Integer accountId;
    private Integer quantity;

    // Getters và Setters
    public Integer getGameId() { return gameId; }
    public void setGameId(Integer gameId) { this.gameId = gameId; }
    public Integer getAccountId() { return accountId; }
    public void setAccountId(Integer accountId) { this.accountId = accountId; }
    public Integer getQuantity() { return quantity; }
    public void setQuantity(Integer quantity) { this.quantity = quantity; }
}