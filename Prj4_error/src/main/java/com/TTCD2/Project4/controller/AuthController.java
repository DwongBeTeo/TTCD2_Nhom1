package com.TTCD2.Project4.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.TTCD2.Project4.dto.LoginRequest;
import com.TTCD2.Project4.dto.RegisterRequest;
import com.TTCD2.Project4.service.AuthService;

@Controller
public class AuthController {

	@Autowired
    private AuthService authService;
	
	
	@GetMapping("/login")
    public String showLoginForm(Model model, @RequestParam(value = "error", required = false) String error,
                                @RequestParam(value = "success", required = false) String success) {
        model.addAttribute("loginRequest", new LoginRequest());
        model.addAttribute("registerRequest", new RegisterRequest());
        if (error != null) {
            model.addAttribute("loginError", "Tên tài khoản hoặc mật khẩu không đúng!");
        }
        if (success != null) {
            model.addAttribute("registerSuccess", "Đăng ký thành công! Vui lòng đăng nhập.");
        }
        return "login"; // Trả về test.html (trang chủ) thay vì fragment
    }

    @GetMapping("/register")
    public String showRegisterForm(Model model) {
        model.addAttribute("loginRequest", new LoginRequest());
        model.addAttribute("registerRequest", new RegisterRequest());
        return "register"; // Trả về test.html
    }

    @PostMapping("/register")
    public String register(@ModelAttribute("registerRequest") RegisterRequest registerRequest, BindingResult result, Model model) {
        try {
            authService.register(registerRequest);
            return "redirect:/login?success";
        } catch (RuntimeException e) {
            model.addAttribute("loginRequest", new RegisterRequest());
            model.addAttribute("registerRequest", registerRequest);
            model.addAttribute("registError", e.getMessage());
            return "register"; // Trả về test.html nếu có lỗi
        }
    }
    
}
