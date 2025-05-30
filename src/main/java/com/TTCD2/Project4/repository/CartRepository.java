package com.TTCD2.Project4.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.TTCD2.Project4.entity.Cart;

public interface CartRepository extends JpaRepository<Cart, Integer> {
    // Tìm tất cả mục trong giỏ hàng của một user
    List<Cart> findByUserId(Integer userId);

    // Kiểm tra xem một tài khoản đã có trong giỏ hàng của user chưa
    Optional<Cart> findByUserIdAndGameIdAndAccountId(Integer userId, Integer gameId, Integer accountId);
}