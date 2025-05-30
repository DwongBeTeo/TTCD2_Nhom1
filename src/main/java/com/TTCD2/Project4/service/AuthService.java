package com.TTCD2.Project4.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.TTCD2.Project4.dto.RegisterRequest;
import com.TTCD2.Project4.entity.Users;
import com.TTCD2.Project4.repository.UsersRepository;

@Service
public class AuthService {

    @Autowired
    private UsersRepository usersRepository;

	/*
	 * @Autowired private PasswordEncoder passwordEncoder;
	 */

    public Users register(RegisterRequest request) {
        if (usersRepository.findByUsername(request.getUsername()).isPresent() ||
            usersRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("Tên người dùng hoặc email đã tồn tại");
        }

        Users users = new Users();
        users.setUsername(request.getUsername());
        users.setEmail(request.getEmail());
     // Trong AuthService.java, sửa phương thức register
        users.setPasswordHash(request.getPassword()); // Tạm bỏ passwordEncoder.encode
//        users.setPasswordHash(passwordEncoder.encode(request.getPassword()));
        users.setRole(Users.Role.buyer);

        return usersRepository.save(users);
    }
}