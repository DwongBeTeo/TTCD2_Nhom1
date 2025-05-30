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
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "Valorant_Accounts")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ValorantAccount {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer accountId;

    @Column(name = "competitive")
    private String competitive;

    @Column(name = "number_of_agents")
    private Integer numberOfAgents;

    @Column(name = "number_of_weapon_skins")
    private Integer numberOfWeaponSkins;

    @Column(name = "price", nullable = false)
    private Double price;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private Status status = Status.available;

	@Column(name = "inventory_quantity", nullable = false)
    private Integer inventoryQuantity = 0;

    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();

    public enum Status {
        available, sold, pending
    }
    
    public ValorantAccount() {
		super();
		// TODO Auto-generated constructor stub
	}

	public ValorantAccount(Integer accountId, String competitive, Integer numberOfAgents, Integer numberOfWeaponSkins,
			Double price, String description, Status status, Integer inventoryQuantity, LocalDateTime createdAt) {
		super();
		this.accountId = accountId;
		this.competitive = competitive;
		this.numberOfAgents = numberOfAgents;
		this.numberOfWeaponSkins = numberOfWeaponSkins;
		this.price = price;
		this.description = description;
		this.status = status;
		this.inventoryQuantity = inventoryQuantity;
		this.createdAt = createdAt;
	}

	// Getters and Setters
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

	public Integer getNumberOfAgents() {
		return numberOfAgents;
	}

	public void setNumberOfAgents(Integer numberOfAgents) {
		this.numberOfAgents = numberOfAgents;
	}

	public Integer getNumberOfWeaponSkins() {
		return numberOfWeaponSkins;
	}

	public void setNumberOfWeaponSkins(Integer numberOfWeaponSkins) {
		this.numberOfWeaponSkins = numberOfWeaponSkins;
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

