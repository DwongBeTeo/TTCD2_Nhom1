package com.TTCD2.Project4.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import com.TTCD2.Project4.entity.ValorantAccount;
import com.TTCD2.Project4.service.ValorantAccountService;


@Controller
@RequestMapping("/valorant-accounts")

public class ValorantAccountController {
	@Autowired
    private ValorantAccountService service;

    // Hiển thị danh sách tài khoản
    @GetMapping
    public String getAllAccounts(Model model) {
        List<ValorantAccount> accounts = service.getAllAccounts();
        model.addAttribute("accounts", accounts);
        return "Admin/valorant-accounts"; // Tên file HTML (account-list.html)
    }

    // Hiển thị form thêm tài khoản
    @GetMapping("/add")
    public String showAddForm(Model model) {
        model.addAttribute("account", new ValorantAccount());
        return "Admin/ValorantForm/account-form"; // Tên file HTML cho form
    }

    // Xử lý thêm tài khoản
    @PostMapping("/add")
    public String addAccount(@ModelAttribute ValorantAccount account) {
        service.createAccount(account);
        return "redirect:/valorant-accounts";
    }

    // Hiển thị form chỉnh sửa tài khoản
    @GetMapping("/edit/{id}")
    public String showEditForm(@PathVariable("id") Integer id, Model model) {
        ValorantAccount account = service.getAccountById(id)
                .orElseThrow(() -> new IllegalArgumentException("Tài khoản không tồn tại: " + id));
        model.addAttribute("account", account);
        return "Admin/ValorantForm/account-form"; // Tái sử dụng form
    }

    // Xử lý chỉnh sửa tài khoản
    @PostMapping("/edit/{id}")
    public String updateAccount(@PathVariable("id") Integer id, @ModelAttribute ValorantAccount account) {
        service.updateAccount(id, account);
        return "redirect:/valorant-accounts";
    }

    // Xử lý xóa tài khoản
    @GetMapping("/delete/{id}")
    public String deleteAccount(@PathVariable("id") Integer id) {
        service.deleteAccount(id);
        return "redirect:/valorant-accounts";
    }
}