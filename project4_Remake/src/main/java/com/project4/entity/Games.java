package com.project4.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "Games")
public class Games {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "game_id")
    private Integer gameId;

    @Column(name = "game_name", nullable = false)
    private String gameName;

    // Getters và Setters
    public Integer getGameId() { return gameId; }
    public void setGameId(Integer gameId) { this.gameId = gameId; }
    public String getGameName() { return gameName; }
    public void setGameName(String gameName) { this.gameName = gameName; }
}