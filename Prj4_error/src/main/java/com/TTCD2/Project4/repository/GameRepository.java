package com.TTCD2.Project4.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.TTCD2.Project4.entity.Game;

public interface GameRepository extends JpaRepository<Game, Integer> {
}