//AuthResponse: Trả về JWT token sau khi đăng nhập.
package com.project4.dto;

public class AuthResponse {
    private String token;
    private String role;
    private Integer userId;
    private String username;

    public AuthResponse(String token, String role, Integer userId, String username) {
        this.token = token;
        this.role = role;
        this.userId = userId;
        this.username = username;
    }

    public String getToken() { return token; }
    public void setToken(String token) { this.token = token; }
    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }
    public Integer getUserId() { return userId; }
    public void setUserId(Integer userId) { this.userId = userId; }
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
}
