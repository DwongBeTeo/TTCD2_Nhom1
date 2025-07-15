package com.TTCD2.Project4.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "PUBG_Accounts")
@Data
public class PUBGAccount {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer accountId;

    private Double killDeathsRatio;

    private Integer matchesPlayed;

    private Integer numberOfSkins;

    @Column(nullable = false)
    private Double price;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(columnDefinition = "ENUM('available', 'sold', 'pending') DEFAULT 'available'")
    private Status status = Status.available;

    @Column(name = "inventory_quantity", nullable = false)
    private Integer inventoryQuantity = 0;

	@Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();

    public enum Status {
        available, sold, pending
    }

	public PUBGAccount() {
		super();
		// TODO Auto-generated constructor stub
	}

	
	public PUBGAccount(Integer accountId, Double killDeathsRatio, Integer matchesPlayed, Integer numberOfSkins,
			Double price, String description, Status status, Integer inventoryQuantity, LocalDateTime createdAt) {
		super();
		this.accountId = accountId;
		this.killDeathsRatio = killDeathsRatio;
		this.matchesPlayed = matchesPlayed;
		this.numberOfSkins = numberOfSkins;
		this.price = price;
		this.description = description;
		this.status = status;
		this.inventoryQuantity = inventoryQuantity;
		this.createdAt = createdAt;
	}

	public Integer getAccountId() {
		return accountId;
	}

	public void setAccountId(Integer accountId) {
		this.accountId = accountId;
	}

	public Double getKillDeathsRatio() {
		return killDeathsRatio;
	}

	public void setKillDeathsRatio(Double killDeathsRatio) {
		this.killDeathsRatio = killDeathsRatio;
	}

	public Integer getMatchesPlayed() {
		return matchesPlayed;
	}

	public void setMatchesPlayed(Integer matchesPlayed) {
		this.matchesPlayed = matchesPlayed;
	}

	public Integer getNumberOfSkins() {
		return numberOfSkins;
	}

	public void setNumberOfSkins(Integer numberOfSkins) {
		this.numberOfSkins = numberOfSkins;
	}

	public Double getPrice() {
		return price;
	}

	public void setPrice(Double price) {
		this.price = price;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Status getStatus() {
		return status;
	}

	public void setStatus(Status status) {
		this.status = status;
	}
	
	public Integer getInventoryQuantity() {
		return inventoryQuantity;
	}
	
	public void setInventoryQuantity(Integer inventoryQuantity) {
		this.inventoryQuantity = inventoryQuantity;
	}

	public LocalDateTime getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(LocalDateTime createdAt) {
		this.createdAt = createdAt;
	}
	
    
}