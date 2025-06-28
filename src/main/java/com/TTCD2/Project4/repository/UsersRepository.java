package com.TTCD2.Project4.repository;

import com.TTCD2.Project4.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UsersRepository extends JpaRepository<Users, Integer> {
	
	//Phương thức findByUserId: Dùng để lấy User dựa trên userId từ Order
	Optional<Users> findByUserId(Integer userId);
	
    Optional<Users> findByUsername(String username);
    Optional<Users> findByEmail(String email);
}