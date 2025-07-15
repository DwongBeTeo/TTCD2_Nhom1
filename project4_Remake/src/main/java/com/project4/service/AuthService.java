//register: Lưu mật khẩu trực tiếp từ authRequest.getPassword() vào passwordHash.
//login: So sánh mật khẩu plaintext trực tiếp bằng equals.
package com.project4.service;

import com.project4.dto.AuthRequest;
import com.project4.dto.AuthResponse;
import com.project4.entity.User;
import com.project4.repository.UserRepository;
import com.project4.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtil jwtUtil;

    public void register(AuthRequest authRequest) {
        // Kiểm tra username hoặc email đã tồn tại
        if (userRepository.findByUsername(authRequest.getUsername()).isPresent()) {
            throw new RuntimeException("Username already exists");
        }
        if (userRepository.findByEmail(authRequest.getEmail()).isPresent()) {
            throw new RuntimeException("Email already exists");
        }

        // Tạo user mới
        User user = new User();
        user.setUsername(authRequest.getUsername());
        user.setEmail(authRequest.getEmail());
        user.setPasswordHash(authRequest.getPassword()); // Lưu plaintext
        user.setRole(User.Role.buyer); // Mặc định là buyer
        userRepository.save(user);
    }

    public AuthResponse login(AuthRequest authRequest) {
        User user = userRepository.findByUsername(authRequest.getUsername())
                .orElseThrow(() -> new RuntimeException("Invalid username or password or userId"));

        if (!authRequest.getPassword().equals(user.getPasswordHash())) {
            throw new RuntimeException("Invalid username or password");
        }

        String token = jwtUtil.generateToken(user.getUsername(), user.getRole().name());
        return new AuthResponse(token, user.getRole().name(), user.getUserId(), user.getUsername());
    }
}