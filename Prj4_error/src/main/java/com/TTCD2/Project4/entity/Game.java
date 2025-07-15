package com.TTCD2.Project4.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "Games")
@Data
public class Game {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer gameId;

    @Column(nullable = false, unique = true, length = 100)
    private String gameName;

    @Column(length = 50)
    private String genre;

    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();

	public Game() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Game(Integer gameId, String gameName, String genre, LocalDateTime createdAt) {
		super();
		this.gameId = gameId;
		this.gameName = gameName;
		this.genre = genre;
		this.createdAt = createdAt;
	}

	public Integer getGameId() {
		return gameId;
	}

	public void setGameId(Integer gameId) {
		this.gameId = gameId;
	}

	public String getGameName() {
		return gameName;
	}

	public void setGameName(String gameName) {
		this.gameName = gameName;
	}

	public String getGenre() {
		return genre;
	}

	public void setGenre(String genre) {
		this.genre = genre;
	}

	public LocalDateTime getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(LocalDateTime createdAt) {
		this.createdAt = createdAt;
	}
    
}
