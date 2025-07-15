package com.project4.controller;

import com.project4.entity.ValorantAccount;
import com.project4.service.ValorantAccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/valorant-accounts")
public class ValorantAccountController {

    @Autowired
    private ValorantAccountService valorantAccountService;

    @GetMapping("/admin")
    public ResponseEntity<Page<ValorantAccount>> getAllAccountsForAdmin(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(required = false) String keyword) {
        try {
            Pageable pageable = PageRequest.of(page, 5);
            Page<ValorantAccount> accounts;
            if (keyword != null && !keyword.trim().isEmpty()){
                accounts = valorantAccountService.findAccountsByCompetitiveAdmin(keyword, pageable);
            }else {
                accounts = valorantAccountService.getAllAccountsForAdmin(pageable);
            }
            return ResponseEntity.ok(accounts);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // Hiển thị danh sách chỉ các tài khoản có status=available với phân trang (5 sản phẩm/trang)
    @GetMapping
    public ResponseEntity<Page<ValorantAccount>> getAllAccounts(
            @RequestParam(defaultValue = "0") int page) {
        try {
            Pageable pageable = PageRequest.of(page, 5);
            Page<ValorantAccount> accounts = valorantAccountService.getAllAccounts(pageable);
            return ResponseEntity.ok(accounts);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // Lấy tài khoản theo ID
    @GetMapping("/{id}")
    public ResponseEntity<ValorantAccount> getAccountById(@PathVariable Integer id) {
        Optional<ValorantAccount> account = valorantAccountService.getAccountById(id);
        return account.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Tạo tài khoản mới
    @PostMapping
    public ValorantAccount createAccount(@RequestBody ValorantAccount account) {
        return valorantAccountService.createAccount(account);
    }

    // Cập nhật tài khoản
    @PutMapping("/{id}")
    public ResponseEntity<ValorantAccount> updateAccount(@PathVariable Integer id, @RequestBody ValorantAccount accountDetails) {
        ValorantAccount updatedAccount = valorantAccountService.updateAccount(id, accountDetails);
        if (updatedAccount != null) {
            return ResponseEntity.ok(updatedAccount);
        }
        return ResponseEntity.notFound().build();
    }

    // Xóa tài khoản
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAccount(@PathVariable Integer id) {
        valorantAccountService.deleteAccount(id);
        return ResponseEntity.noContent().build();
    }

//    // Tìm kiếm tài khoản theo competitive
//    @GetMapping("/search")
//    public List<ValorantAccount> findAccountsByCompetitive(@RequestParam String competitive) {
//        return valorantAccountService.findAccountsByCompetitive(competitive);
//    }

    // Tìm kiếm tài khoản theo competitive với phân trang cho khách vãng lai hoặc role:buyer
//    Phương thức: GET
//    http://localhost:8082/api/valorant-accounts?page=0&size=2
    // Tìm kiếm tài khoản theo competitive với phân trang (5 sản phẩm/trang)
    @GetMapping("/search")
    public ResponseEntity<Page<ValorantAccount>> findAccountsByCompetitive(
            @RequestParam String competitive,
            @RequestParam(defaultValue = "0") int page) {
        try {
            if (competitive == null || competitive.trim().isEmpty()) {
                return ResponseEntity.badRequest().body(null);
            }
            Pageable pageable = PageRequest.of(page, 5);
            Page<ValorantAccount> accounts = valorantAccountService.findAccountsByCompetitive(competitive, pageable);
            return ResponseEntity.ok(accounts);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(null);
        }
    }


}
