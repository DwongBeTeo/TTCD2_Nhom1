package com.TTCD2.Project4.controller;

import com.TTCD2.Project4.dto.OrderDTO;
import com.TTCD2.Project4.dto.RegisterRequest;
import com.TTCD2.Project4.entity.LienQuanAccount;
import com.TTCD2.Project4.entity.PUBGAccount;
import com.TTCD2.Project4.entity.Transaction;
import com.TTCD2.Project4.entity.Users;
import com.TTCD2.Project4.entity.ValorantAccount;
import com.TTCD2.Project4.repository.UsersRepository;
import com.TTCD2.Project4.service.AccountService;
import com.TTCD2.Project4.service.AuthService;
import com.TTCD2.Project4.service.OrderService;
import com.TTCD2.Project4.service.ValorantAccountService;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class AdminController {
	

    @Autowired
    private AccountService accountService;
    
    @Autowired
    private ValorantAccountService valorantAccountService;

    @Autowired
    private OrderService orderService;

    @Autowired
    private UsersRepository userRepository;

    // giỏ hàng của user
    @GetMapping("/orders")
    public String showUserOrderHistory(Authentication authentication, Model model) {
        try {
            // Lấy username từ Authentication
            String username = authentication.getName();
            // Tìm userId từ username
            Users user = userRepository.findByUsername(username)
                    .orElseThrow(() -> new IllegalStateException("Người dùng không tồn tại"));
            // Lấy lịch sử mua hàng
            List<OrderDTO> orders = orderService.getOrdersByUserId(user.getUserId());
            model.addAttribute("orders", orders);
            model.addAttribute("username", username);
            if (orders.isEmpty()) {
                model.addAttribute("message", "Bạn chưa có đơn hàng nào.");
            }
        } catch (Exception e) {
            model.addAttribute("error", "Lỗi khi tải lịch sử mua hàng: " + e.getMessage());
        }
        return "Public/orders";
    }
    
    
    // Xem tất cả đơn hàng
    @GetMapping("/admin/orders")
    public String showAllOrders(Model model) {
        try {
            List<OrderDTO> orders = orderService.getAllOrders();
            model.addAttribute("orders", orders);
            if (orders.isEmpty()) {
                model.addAttribute("message", "Chưa có đơn hàng nào.");
            }
        } catch (Exception e) {
            model.addAttribute("error", "Lỗi khi tải danh sách đơn hàng: " + e.getMessage());
        }
        return "Admin/orders/listOrders";
    }

    // Xem đơn hàng của một khách hàng
    @GetMapping("/admin/orders/user/{userId}")
    public String showUserOrders(@PathVariable Integer userId, Model model) {
        try {
            List<OrderDTO> orders = orderService.getOrdersByUserId(userId);
            model.addAttribute("orders", orders);
            model.addAttribute("userId", userId);
            if (orders.isEmpty()) {
                model.addAttribute("message", "Khách hàng chưa có đơn hàng nào.");
            }
        } catch (Exception e) {
            model.addAttribute("error", "Lỗi khi tải đơn hàng của khách hàng: " + e.getMessage());
        }
        return "Admin/orders/userOrders";
    }
	
	@GetMapping("/admin")
	public String admin() {
		return "Admin/index";
	}
	
	//Trang Chu
	@GetMapping({"/", "/products"})
    public String showProducts(Model model) {
        return "products";
    }

    @GetMapping("/lienquan")
    public String showLienQuanAccounts(Model model) {
        try {
            List<LienQuanAccount> accounts = accountService.getAllAvailableLienQuanAccounts();
            System.out.println("LienQuan Accounts sent to lienquan.html: " + accounts);
            model.addAttribute("accounts", accounts);
        } catch (Exception e) {
            System.err.println("Error in showLienQuanAccounts: " + e.getMessage());
            e.printStackTrace();
        }
        return "Public/lienquan/lienquanProduct";
    }

    
//    link demo valorant
    @GetMapping("/test")
	public String test() {
		return "test";
	}
//    link dẫn Valorant
    @GetMapping("/valorant")
    public String showValorantAccounts(Model model) {
        try {
            List<ValorantAccount> accounts = accountService.getAllAvailableValorantAccounts();
            System.out.println("Valorant Accounts sent to valorant.html: " + accounts);
            model.addAttribute("accounts", accounts);
        } catch (Exception e) {
            System.err.println("Error in showValorantAccounts: " + e.getMessage());
            e.printStackTrace();
        }
        return "Public/valorant/valorantProduct";
    }
    
 	
    //Hiển thị danh sách sản phẩm cho user với phân trang
    @GetMapping("/listValorantAccount")
    public String showListValorantAccounts(
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "5") int size,
            Model model) {
        try {
            Pageable pageable = PageRequest.of(page, size);
            Page<ValorantAccount> accountPage = accountService.getAllAvailableValorantAccounts(pageable);
            System.out.println("Valorant Accounts sent to valorant.html: " + accountPage.getContent());
            model.addAttribute("accounts", accountPage.getContent());
            model.addAttribute("currentPage", page);
            model.addAttribute("totalPages", accountPage.getTotalPages());
            model.addAttribute("totalItems", accountPage.getTotalElements());
            model.addAttribute("pageSize", size);
        } catch (Exception e) {
            System.err.println("Error in showListValorantAccounts: " + e.getMessage());
            e.printStackTrace();
        }
        return "Public/valorant/listAccountValorant";
    }
    
 	// Hiển thị Chi tiết sản phẩm theo id
  	@GetMapping("/valorantDetail-{id}")
      public String ValorantAccountDetal(@PathVariable Integer id,Model model) {
          try {
          	Optional<ValorantAccount> account = valorantAccountService.getAccountById(id);
              System.out.println("Valorant Accounts sent to valorant.html: " + account);
              model.addAttribute("account", account);
          } catch (Exception e) {
              System.err.println("Error in showValorantAccounts: " + e.getMessage());
              e.printStackTrace();
          }
          return "Public/valorant/ValorantDetail";
      }
// End Valorants
    
    
    @GetMapping("/pubg")
    public String showPubgAccounts(Model model) {
        try {
            List<PUBGAccount> accounts = accountService.getAllAvailablePubgAccounts();
            System.out.println("PUBG Accounts sent to pubg.html: " + accounts);
            model.addAttribute("accounts", accounts);
        } catch (Exception e) {
            System.err.println("Error in showPubgAccounts: " + e.getMessage());
            e.printStackTrace();
        }
        return "Public/pubg/pubgProduct";
    }

}