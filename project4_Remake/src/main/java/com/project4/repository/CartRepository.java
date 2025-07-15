package com.project4.repository;

import com.project4.entity.Cart;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CartRepository extends JpaRepository<Cart, Integer> {
    List<Cart> findByUserId(Integer userId);
    Optional<Cart> findByUserIdAndGameIdAndAccountId(Integer userId, Integer gameId, Integer accountId);
    Page<Cart> findByUserId(Integer userId, Pageable pageable);
}