package com.project4.controller;

import com.project4.entity.User;
import com.project4.repository.UserRepository;
import com.project4.dto.UserUpdateRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    // Liệt kê tất cả người dùng (ROLE_admin)
    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userRepository.findAll();
        return ResponseEntity.ok(users);
    }

    // Xem chi tiết người dùng (ROLE_admin hoặc chính người dùng)
    @GetMapping("/{id}")
    public ResponseEntity<?> getUserById(@PathVariable Integer id) {
        String currentUsername = SecurityContextHolder.getContext().getAuthentication().getName();
        Optional<User> userOptional = userRepository.findById(id);

        if (userOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }

        User user = userOptional.get();
        // Kiểm tra quyền: admin hoặc chính người dùng
        if (!currentUsername.equals(user.getUsername()) &&
                !SecurityContextHolder.getContext().getAuthentication().getAuthorities().stream()
                        .anyMatch(auth -> auth.getAuthority().equals("ROLE_admin"))) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Access denied");
        }

        return ResponseEntity.ok(user);
    }

    // Cập nhật người dùng (ROLE_admin hoặc chính người dùng)
    @PutMapping("/{id}")
    public ResponseEntity<?> updateUser(@PathVariable Integer id, @RequestBody UserUpdateRequest updateRequest) {
        String currentUsername = SecurityContextHolder.getContext().getAuthentication().getName();
        Optional<User> userOptional = userRepository.findById(id);

        if (userOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }

        User user = userOptional.get();
        // Kiểm tra quyền: admin hoặc chính người dùng
        if (!currentUsername.equals(user.getUsername()) &&
                !SecurityContextHolder.getContext().getAuthentication().getAuthorities().stream()
                        .anyMatch(auth -> auth.getAuthority().equals("ROLE_admin"))) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Access denied");
        }

        // Cập nhật thông tin
        if (updateRequest.getEmail() != null) {
            if (userRepository.findByEmail(updateRequest.getEmail()).isPresent() &&
                    !user.getEmail().equals(updateRequest.getEmail())) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Email already exists");
            }
            user.setEmail(updateRequest.getEmail());
        }
        if (updateRequest.getPassword() != null) {
            user.setPasswordHash(updateRequest.getPassword()); // Plaintext
        }
        // Chỉ admin có thể cập nhật role
        if (updateRequest.getRole() != null &&
                SecurityContextHolder.getContext().getAuthentication().getAuthorities().stream()
                        .anyMatch(auth -> auth.getAuthority().equals("ROLE_admin"))) {
            user.setRole(User.Role.valueOf(updateRequest.getRole()));
        }

        userRepository.save(user);
        return ResponseEntity.ok("User updated successfully");
    }

    // Xóa người dùng (ROLE_admin)
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Integer id) {
        Optional<User> userOptional = userRepository.findById(id);

        if (userOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }

        userRepository.deleteById(id);
        return ResponseEntity.ok("User deleted successfully");
    }
}
