package com.TTCD2.Project4.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.TTCD2.Project4.entity.ValorantAccount;
import com.TTCD2.Project4.repository.ValorantAccountRepository;


@Service
public class ValorantAccountService	 {
	@Autowired
    private ValorantAccountRepository repository;

    // Create
    public ValorantAccount createAccount(ValorantAccount account) {
        return repository.save(account);
    }
    
    // Read all with pagination (admin)
    public Page<ValorantAccount> getAllAccounts(Pageable pageable) {
        return repository.findAll(pageable);
    }

    // Read all
    public List<ValorantAccount> getAllAccounts() {
        return repository.findAll();
    }

    // Read by ID
    public Optional<ValorantAccount> getAccountById(Integer id) {
//        return repository.findById(id);  // trả về hết tất cả các sản phẩm có id
    	try {
            Optional<ValorantAccount> account = repository.findById(id);
            // Chỉ trả về nếu Status.available và inventoryQuantity > 0
            return account.filter(acc -> acc.getStatus() == ValorantAccount.Status.available && acc.getInventoryQuantity() > 0);
        } catch (Exception e) {
            System.err.println("Error fetching Valorant account by ID: " + e.getMessage());
            e.printStackTrace();
            return Optional.empty();
        }
    }

    // Update
    public ValorantAccount updateAccount(Integer id, ValorantAccount updatedAccount) {
        Optional<ValorantAccount> existingAccount = repository.findById(id);
        if (existingAccount.isPresent()) {
            ValorantAccount account = existingAccount.get();
            account.setCompetitive(updatedAccount.getCompetitive());
            account.setNumberOfAgents(updatedAccount.getNumberOfAgents());
            account.setNumberOfWeaponSkins(updatedAccount.getNumberOfWeaponSkins());
            account.setPrice(updatedAccount.getPrice());
            account.setDescription(updatedAccount.getDescription());
            account.setInventoryQuantity(updatedAccount.getInventoryQuantity());
            account.setUsernameValorant(updatedAccount.getUsernameValorant());
            account.setPasswordValorant(updatedAccount.getPasswordValorant());
            account.setEmailValorant(updatedAccount.getEmailValorant());
            account.setStatus(updatedAccount.getStatus());
            return repository.save(account);	
        } else {
            throw new RuntimeException("Account not found with id: " + id);
        }
    }

    // Delete
    public void deleteAccount(Integer id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
        } else {
            throw new RuntimeException("Account not found with id: " + id);
        }
    }
}

