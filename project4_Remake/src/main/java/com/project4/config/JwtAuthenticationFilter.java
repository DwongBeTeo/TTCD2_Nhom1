//Trích xuất token từ header.
//Xác thực token bằng JwtUtil.
//Tải thông tin user từ CustomUserDetailsService và set vào SecurityContext để Spring Security xử lý phân quyền
package com.project4.config;

import com.project4.repository.BlacklistedTokenRepository;
import com.project4.service.CustomUserDetailsService;
import com.project4.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private CustomUserDetailsService userDetailsService;

    @Autowired
    private BlacklistedTokenRepository blacklistedTokenRepository;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        // Bỏ qua các endpoint public
        String path = request.getRequestURI();
        if (path.startsWith("/api/auth") ||
                path.startsWith("/api/valorant-accounts") && request.getMethod().equalsIgnoreCase("GET")) {
            filterChain.doFilter(request, response);
            return;
        }

        String authHeader = request.getHeader("Authorization");
        String token = null;
        String username = null;

        // Kiểm tra header Authorization có chứa Bearer token
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            token = authHeader.substring(7);
            if (blacklistedTokenRepository.existsByToken(token)) {
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                response.getWriter().write("Token has been blacklisted");
                return;
            }
            try {
                username = jwtUtil.getUsernameFromToken(token);
            } catch (RuntimeException e) {
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                response.getWriter().write("Invalid token: " + e.getMessage());
                return;
            }
        }

        // Nếu token hợp lệ và chưa có authentication trong SecurityContext
        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            UserDetails userDetails = userDetailsService.loadUserByUsername(username);
            if (jwtUtil.validateToken(token, userDetails)) {
                UsernamePasswordAuthenticationToken authToken =
                        new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authToken);
            } else {
                System.out.println("Token validation failed");
            }
        } else {
            System.out.println("No valid username or authentication already set");
        }

        filterChain.doFilter(request, response);
    }
}

//OncePerRequestFilter: Đảm bảo filter chỉ chạy một lần cho mỗi request.
//Trích xuất token: Lấy token từ header Authorization (bỏ prefix "Bearer ").
//Xác thực token: Dùng JwtUtil để lấy username và kiểm tra token hợp lệ.
//Tải UserDetails: Gọi CustomUserDetailsService.loadUserByUsername để lấy thông tin user (bao gồm role).
//Set SecurityContext: Lưu thông tin xác thực để Spring Security sử dụng cho phân quyền.
//Log lỗi: In lỗi nếu parse token thất bại để dễ debug.