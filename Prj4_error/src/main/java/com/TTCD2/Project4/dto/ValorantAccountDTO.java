package com.TTCD2.Project4.dto;

public class ValorantAccountDTO {
    private Integer id;
    private String usernameValorant;
    private Double price;
    private String description;
    private Integer inventoryQuantity;
    private String competitive;
    private Integer numberOfAgents;
    private Integer numberOfWeaponSkins;

    // Getters and Setters
    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }

    public String getUsernameValorant() { return usernameValorant; }
    public void setUsernameValorant(String usernameValorant) { this.usernameValorant = usernameValorant; }

    public Double getPrice() { return price; }
    public void setPrice(Double price) { this.price = price; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public Integer getInventoryQuantity() { return inventoryQuantity; }
    public void setInventoryQuantity(Integer inventoryQuantity) { this.inventoryQuantity = inventoryQuantity; }

    public String getCompetitive() { return competitive; }
    public void setCompetitive(String competitive) { this.competitive = competitive; }

    public Integer getNumberOfAgents() { return numberOfAgents; }
    public void setNumberOfAgents(Integer numberOfAgents) { this.numberOfAgents = numberOfAgents; }

    public Integer getNumberOfWeaponSkins() { return numberOfWeaponSkins; }
    public void setNumberOfWeaponSkins(Integer numberOfWeaponSkins) { this.numberOfWeaponSkins = numberOfWeaponSkins; }
}