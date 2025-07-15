package com.project4.config;

//import com.project4.util.JwtUtil;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
//import org.springframework.security.web.SecurityFilterChain;

import com.project4.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.Arrays;
import java.util.List;


@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private JwtAuthenticationFilter jwtAuthenticationFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .cors(Customizer.withDefaults())
                .csrf(csrf -> csrf.disable()) // Tắt CSRF
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/auth/**").permitAll() // Cho phép truy cập /api/auth/**
                        .requestMatchers(HttpMethod.GET, "/api/users/{id}").hasAnyRole("admin", "buyer")
                        .requestMatchers(HttpMethod.PUT, "/api/users/{id}").hasAnyRole("admin", "buyer")
                        .requestMatchers("/api/users/**").hasRole("admin")
                        .requestMatchers(HttpMethod.GET, "/api/valorant-accounts").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/valorant-accounts/{id}").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/valorant-accounts/search").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/valorant-accounts/search/competitive").permitAll()
                        .requestMatchers("/api/valorant-accounts/**").hasRole("admin")
                        .requestMatchers("/api/cart/**").hasRole("buyer")
                        .requestMatchers(HttpMethod.GET, "/api/orders").hasAnyRole("buyer","admin")
                        .requestMatchers("/api/checkout").hasRole("buyer")
                        .requestMatchers(HttpMethod.GET, "/api/orders/{userId}").hasRole("admin")
//                        .anyRequest().authenticated() // Các request khác cần xác thực
                                .anyRequest().permitAll()
                )
                .sessionManagement(session -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS) // Không sử dụng session
                )
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);


        // Thêm JWT filter sau ở bước phân quyền
        return http.build();
    }

    @Bean
    public CorsFilter corsFilter() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOrigins(List.of("http://localhost:5173")); // 👈 rất quan trọng
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        config.setAllowedHeaders(List.of("*"));
        config.setAllowCredentials(true); // Nếu bạn dùng JWT/cookie

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);

        return new CorsFilter(source);
    }
}