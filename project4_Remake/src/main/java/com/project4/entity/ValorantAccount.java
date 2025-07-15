package com.project4.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "Valorant_Accounts")
public class ValorantAccount {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "account_id")
    @JsonProperty("id")
    private Integer accountId;

    @Column(name = "competitive", length = 50)
    private String competitive; // VD: Radiant, Diamond

    @Column(name = "number_of_agents")
    private Integer numberOfAgents;

    @Column(name = "number_of_weapon_skins")
    private Integer numberOfWeaponSkins;

    @Column(name = "price", nullable = false)
    private Double price;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private Status status;

    @Column(name = "inventory_quantity", nullable = false)
    private Integer inventoryQuantity;

    @Column(name = "created_at", nullable = false, updatable = false, columnDefinition = "DATETIME DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime createdAt;

    @Column(name = "username_valorant", nullable = false, unique = true, length = 50)
    private String usernameValorant;

    @Column(name = "password_valorant", nullable = false, length = 255)
    private String passwordValorant;

    @Column(name = "email_valorant", nullable = false, length = 100)
    private String emailValorant;

    public enum Status {
        available, sold, pending
    }

    @PrePersist
    protected void onCreate() {
        if (createdAt == null) {
            createdAt = LocalDateTime.now();
        }
    }

    // Getters và Setters
    public Integer getAccountId() { return accountId; }
    public void setAccountId(Integer accountId) { this.accountId = accountId; }
    public String getCompetitive() { return competitive; }
    public void setCompetitive(String competitive) { this.competitive = competitive; }
    public Integer getNumberOfAgents() { return numberOfAgents; }
    public void setNumberOfAgents(Integer numberOfAgents) { this.numberOfAgents = numberOfAgents; }
    public Integer getNumberOfWeaponSkins() { return numberOfWeaponSkins; }
    public void setNumberOfWeaponSkins(Integer numberOfWeaponSkins) { this.numberOfWeaponSkins = numberOfWeaponSkins; }
    public Double getPrice() { return price; }
    public void setPrice(Double price) { this.price = price; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public Status getStatus() { return status; }
    public void setStatus(Status status) { this.status = status; }
    public Integer getInventoryQuantity() { return inventoryQuantity; }
    public void setInventoryQuantity(Integer inventoryQuantity) { this.inventoryQuantity = inventoryQuantity; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    public String getUsernameValorant() { return usernameValorant; }
    public void setUsernameValorant(String usernameValorant) { this.usernameValorant = usernameValorant; }
    public String getPasswordValorant() { return passwordValorant; }
    public void setPasswordValorant(String passwordValorant) { this.passwordValorant = passwordValorant; }
    public String getEmailValorant() { return emailValorant; }
    public void setEmailValorant(String emailValorant) { this.emailValorant = emailValorant; }
}