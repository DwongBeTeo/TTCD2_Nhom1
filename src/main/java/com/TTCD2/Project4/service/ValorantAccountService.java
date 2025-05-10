package com.TTCD2.Project4.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.TTCD2.Project4.entity.ValorantAccount;
import com.TTCD2.Project4.repository.ValorantAccountRepository;


@Service
public class ValorantAccountService {
	@Autowired
    private ValorantAccountRepository repository;

    // Create
    public ValorantAccount createAccount(ValorantAccount account) {
        return repository.save(account);
    }

    // Read all
    public List<ValorantAccount> getAllAccounts() {
        return repository.findAll();
    }

    // Read by ID
    public Optional<ValorantAccount> getAccountById(Integer id) {
        return repository.findById(id);
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

