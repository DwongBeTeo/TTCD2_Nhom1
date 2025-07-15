//generateToken: Tạo JWT token chứa username và role, ký bằng secret và hết hạn sau expiration.
//getUsernameFromToken và getRoleFromToken: Trích xuất thông tin từ token.
//validateToken: Kiểm tra token hợp lệ.
package com.project4.util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtUtil {

    @Value("${jwt.secret}")
    private String secret;

    private Key getSigningKey() {
        byte[] keyBytes = secret.getBytes();
        if (keyBytes.length < 64) {
            throw new IllegalArgumentException("JWT secret key must be at least 64 bytes for HS512");
        }
        return Keys.hmacShaKeyFor(keyBytes);
    }

    @Value("${jwt.expiration}")
    private long expiration;

    public String generateToken(String username, String role) {
        try {
            System.out.println("Generating token for username: " + username + ", role: " + role);
            String token = Jwts.builder()
                    .setSubject(username)
                    .claim("role", "ROLE_"+role)
                    .setIssuedAt(new Date())
                    .setExpiration(new Date(System.currentTimeMillis() + expiration))
                    .signWith(getSigningKey(), SignatureAlgorithm.HS512)
                    .compact();
            System.out.println("Token generated: " + token);
            return token;
        } catch (Exception e) {
            System.err.println("Error generating token: " + e.getMessage());
            throw e;
        }
    }

    public String getUsernameFromToken(String token) {
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
        return claims.getSubject();
    }

    public String getRoleFromToken(String token) {
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
        return (String) claims.get("role");
    }

    public Date extractExpiration(String token) {
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
        return claims.getExpiration();
    }

    public boolean validateToken(String token, UserDetails userDetails) {
        try {
            Jwts.parserBuilder()
                    .setSigningKey(getSigningKey())
                    .build()
                    .parseClaimsJws(token)
                    .getBody();
            return true;
        } catch (JwtException e) {
            System.err.println("Token validation failed: " + e.getMessage());
            return false;
        }
    }
}