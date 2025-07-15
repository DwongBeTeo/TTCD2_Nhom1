package com.project4.service;

import com.project4.dto.CartItemDto;
import com.project4.dto.CartResponseDto;
import com.project4.entity.Cart;
import com.project4.entity.User;
import com.project4.entity.ValorantAccount;
import com.project4.repository.CartRepository;
import com.project4.repository.UserRepository;
import com.project4.repository.ValorantAccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CartService {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ValorantAccountRepository accountRepository;

    public CartResponseDto getCart(Integer userId, Pageable pageable) {
        Page<Cart> cartPage = cartRepository.findByUserId(userId, pageable);
        List<CartItemDto> items = cartPage.getContent().stream().map(cart -> {
            Optional<ValorantAccount> account = accountRepository.findByAccountIdAndStatus(cart.getAccountId(), ValorantAccount.Status.available);
            Double price = account.map(ValorantAccount::getPrice).orElse(0.0);
            Integer inventoryQuantity = account.map(ValorantAccount::getInventoryQuantity).orElse(0);
            return new CartItemDto(cart.getCartId(), cart.getGameId(), cart.getAccountId(), cart.getQuantity(), price, inventoryQuantity);
        }).collect(Collectors.toList());

        Double total = items.stream()
                .mapToDouble(item -> item.getQuantity() * item.getPrice())
                .sum();

        return new CartResponseDto(items, total);
    }

    public Cart addToCart(Integer userId, Integer gameId, Integer accountId, Integer quantity) {
        Optional<ValorantAccount> account = accountRepository.findByAccountIdAndStatus(accountId, ValorantAccount.Status.available);
        if (account.isEmpty()) {
            throw new RuntimeException("Account not available");
        }
        if (account.get().getInventoryQuantity() < quantity) {
            throw new RuntimeException("Insufficient inventory: only " + account.get().getInventoryQuantity() + " available");
        }

        Optional<Cart> cartOptional = cartRepository.findByUserIdAndGameIdAndAccountId(userId, gameId, accountId);
        Cart cart;
        if (cartOptional.isPresent()) {
            cart = cartOptional.get();
            cart.setQuantity(cart.getQuantity() + quantity);
        } else {
            cart = new Cart();
            cart.setUserId(userId);
            cart.setGameId(gameId);
            cart.setAccountId(accountId);
            cart.setQuantity(quantity);
        }

        return cartRepository.save(cart);
    }

    public List<Cart> getCart(Integer userId) {
        return cartRepository.findByUserId(userId);
    }

    public Cart updateCart(Integer userId, Integer gameId, Integer accountId, Integer quantity) {
        Optional<Cart> cartOptional = cartRepository.findByUserIdAndGameIdAndAccountId(userId, gameId, accountId);
        if (cartOptional.isEmpty()) {
            throw new RuntimeException("Item not found in cart");
        }

        Optional<ValorantAccount> account = accountRepository.findByAccountIdAndStatus(accountId, ValorantAccount.Status.available);
        if (account.isEmpty()) {
            throw new RuntimeException("Account not available");
        }
        if (quantity > 0 && account.get().getInventoryQuantity() < quantity) {
            throw new RuntimeException("Insufficient inventory: only " + account.get().getInventoryQuantity() + " available");
        }

        Cart cart = cartOptional.get();
        if (quantity <= 0) {
            cartRepository.delete(cart);
            return null;
        } else {
            cart.setQuantity(quantity);
            System.out.println("Updating cart - gameId: " + gameId + ", accountId: " + accountId + ", quantity: " + quantity);
            System.out.println("User ID: " + userId);
            return cartRepository.save(cart);
        }
    }

    public void deleteCartItem(Integer userId, Integer gameId, Integer accountId) {
        Optional<Cart> cartOptional = cartRepository.findByUserIdAndGameIdAndAccountId(userId, gameId, accountId);
        if (cartOptional.isEmpty()) {
            throw new RuntimeException("Item not found in cart");
        }
        cartRepository.delete(cartOptional.get());
    }

    public void clearCart(Integer userId) {
        List<Cart> cartItems = cartRepository.findByUserId(userId);
        cartRepository.deleteAll(cartItems);
    }
}