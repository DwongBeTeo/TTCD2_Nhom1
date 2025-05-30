package com.TTCD2.Project4.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import com.TTCD2.Project4.dto.CartItemDTO;
import com.TTCD2.Project4.dto.CartSummaryDTO;
import com.TTCD2.Project4.dto.CustomUserDetails;
import com.TTCD2.Project4.entity.Cart;
import com.TTCD2.Project4.repository.CartRepository;
import com.TTCD2.Project4.service.CartService;


@Controller
public class CartController {
	@Autowired
    private CartService cartService;
	
	@Autowired
    private CartRepository cartRepository; // Thêm repository để xóa

//    // Giả sử userId được lấy từ session hoặc authentication (ở đây để cố định userId=1 để demo)
//    private Integer getCurrentUserId() {
//        return 1; // Thay bằng logic lấy userId từ session hoặc Spring Security
//    }
    
    private Integer getCurrentUserId() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (principal instanceof CustomUserDetails) {
            return ((CustomUserDetails) principal).getId();
        }
        throw new IllegalStateException("Người dùng chưa đăng nhập!");
    }

    // Thêm sản phẩm vào giỏ hàng từ trang chi tiết
    @PostMapping("/add-to-cart/{gameId}/{accountId}")
    public String addToCart(@PathVariable Integer gameId, @PathVariable Integer accountId, Model model) {
        Integer userId = getCurrentUserId();
        try {
            cartService.addToCart(userId, gameId, accountId);
            return "redirect:/cart";
        } catch (IllegalStateException e) {
            model.addAttribute("error", e.getMessage());
            return "redirect:/cart?error";
        }
    }

    @GetMapping("/cart")
    public String viewCart(Model model) {
        Integer userId = getCurrentUserId();
        CartSummaryDTO cartSummary = cartService.getCartItemsWithDetails(userId);
        model.addAttribute("cartItems", cartSummary.getCartItems());
        model.addAttribute("totalPrice", cartSummary.getTotalPrice());
        return "Public/cart";
    }
    
    @PostMapping("/cart/remove/{cartId}")
    @ResponseBody
    public String removeFromCart(@PathVariable Integer cartId) {
        Integer userId = getCurrentUserId();
        Optional<Cart> cartItem = cartRepository.findById(cartId);
        if (cartItem.isPresent() && cartItem.get().getUserId().equals(userId)) {
        	// Kiểm tra xem cartId thuộc về user hiện tại (bảo mật)
            cartService.removeFromCart(cartId, userId);
            return "success"; // Trả về phản hồi cho AJAX
        }
        return "error"; // Trả về lỗi nếu không xóa được
    }
    
 // API lấy tổng số lượng sản phẩm trong giỏ hàng
    @GetMapping("/cart/count")
    @ResponseBody
    public int getCartItemCount() {
        Integer userId = getCurrentUserId();
        return cartService.getCartItemsWithDetails(userId).getCartItems().stream()
                .mapToInt(CartItemDTO::getQuantity)
                .sum();
    }

    // API lấy danh sách sản phẩm trong giỏ hàng
    @GetMapping("/cart/items")
    @ResponseBody
    public CartSummaryDTO getCartItems() {
        Integer userId = getCurrentUserId();
        return cartService.getCartItemsWithDetails(userId);
    }
}
