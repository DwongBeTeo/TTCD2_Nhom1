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
@Table(name = "LienQuan_Accounts")
@Data
public class LienQuanAccount {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer accountId;

    @Column(length = 50)
    private String competitive;

    private Integer numberOfSkins;

    private Integer numberOfHeroes;

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

	public LienQuanAccount() {
		super();
		// TODO Auto-generated constructor stub
	}

	public LienQuanAccount(Integer accountId, String competitive, Integer numberOfSkins, Integer numberOfHeroes,
			Double price, String description, Status status, Integer inventoryQuantity, LocalDateTime createdAt) {
		super();
		this.accountId = accountId;
		this.competitive = competitive;
		this.numberOfSkins = numberOfSkins;
		this.numberOfHeroes = numberOfHeroes;
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

	public String getCompetitive() {
		return competitive;
	}

	public void setCompetitive(String competitive) {
		this.competitive = competitive;
	}

	public Integer getNumberOfSkins() {
		return numberOfSkins;
	}

	public void setNumberOfSkins(Integer numberOfSkins) {
		this.numberOfSkins = numberOfSkins;
	}

	public Integer getNumberOfHeroes() {
		return numberOfHeroes;
	}

	public void setNumberOfHeroes(Integer numberOfHeroes) {
		this.numberOfHeroes = numberOfHeroes;
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