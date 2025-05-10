package com.TTCD2.Project4.controller;

import com.TTCD2.Project4.service.ValorantAccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class AdminController {
	@RequestMapping("")
	public String home() {
		return "user";
	}
	
	@RequestMapping("/admin")
	public String admin() {
		return "Admin/index";
	}
	
    
//    @GetMapping("/dashboard")
//    public String dashboard(Model model) {
//        model.addAttribute("pageTitle", "Dashboard");
//        return "Admin/dashboard";
//    }

//	 @GetMapping("/valorant-accounts") 
//	 public String getAllAccounts(Model model) {
//		model.addAttribute("accounts", service.getAllAccounts());
//		model.addAttribute("pageTitle", "Valorant Accounts"); 
//		return "Admin/valorant-accounts";
//	 }
	 
}