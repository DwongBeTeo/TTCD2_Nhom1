package com.TTCD2.Project4.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.TTCD2.Project4.entity.Order;

public interface OrderRepository extends JpaRepository<Order, Integer> {
    List<Order> findByUserId(Integer userId);
}
