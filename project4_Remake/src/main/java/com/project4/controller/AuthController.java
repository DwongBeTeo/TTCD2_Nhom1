package com.project4.controller;

import com.project4.entity.BlacklistedToken;
import com.project4.repository.BlacklistedTokenRepository;
import com.project4.util.JwtUtil;
import com.project4.dto.AuthRequest;
import com.project4.dto.AuthResponse;
import com.project4.service.AuthService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.ZoneId;

@RestController
@RequestMapping("/api/auth")
public class AuthController {


    @Autowired
    private BlacklistedTokenRepository blacklistedTokenRepository;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody AuthRequest authRequest) {
        try {
            authService.register(authRequest);
            return ResponseEntity.ok("Registration successful");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Registration failed: " + e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest authRequest) {
        try {
            AuthResponse response = authService.login(authRequest);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Login failed: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Server error: " + e.getMessage());
        }
    }

//    @PostMapping("/login")
//    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
//        try {
//            Authentication authentication = authenticationManager.authenticate(
//                    new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
//            );
//            SecurityContextHolder.getContext().setAuthentication(authentication);
//            String token = jwtUtil.generateToken(authentication);
//            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
//            String role = userDetails.getAuthorities().stream()
//                    .map(GrantedAuthority::getAuthority)
//                    .findFirst()
//                    .orElse("ROLE_user");
//            return ResponseEntity.ok(new LoginResponse(token, request.getUsername(), role));
//        } catch (Exception e) {
//            return ResponseEntity.status(401).body("Invalid username or password");
//        }
//    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request) {
        String authHeader = request.getHeader("Authorization");
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Missing or invalid Authorization header");
        }

        String token = authHeader.substring(7);
        try {
            // Kiểm tra token hợp lệ trước khi blacklist
            jwtUtil.getUsernameFromToken(token); // Ném ngoại lệ nếu token không hợp lệ
            BlacklistedToken blacklistedToken = new BlacklistedToken();
            blacklistedToken.setToken(token);
            blacklistedToken.setExpiryDate(
                    jwtUtil.extractExpiration(token)
                            .toInstant()
                            .atZone(ZoneId.systemDefault())
                            .toLocalDateTime()
            );
            blacklistedTokenRepository.save(blacklistedToken);
            return ResponseEntity.ok("Logged out successfully");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid token: " + e.getMessage());
        }
    }
}