package com.project4.service;

import com.project4.entity.ValorantAccount;
import com.project4.repository.ValorantAccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ValorantAccountService {

    @Autowired
    private ValorantAccountRepository valorantAccountRepository;

    //hiện tất cả cho admin
    public Page<ValorantAccount> getAllAccountsForAdmin(Pageable pageable) {
        return valorantAccountRepository.findAll(pageable);
    }

    public Page<ValorantAccount> getAllAccounts(Pageable pageable) {
        // Chỉ trả về tài khoản có status = 'available'
        return valorantAccountRepository.findAllByStatusAvailable(pageable);
    }

    public Optional<ValorantAccount> getAccountById(Integer id) {
        return valorantAccountRepository.findById(id);
    }

    public ValorantAccount createAccount(ValorantAccount account) {
        return valorantAccountRepository.save(account);
    }

    public ValorantAccount updateAccount(Integer id, ValorantAccount accountDetails) {
        Optional<ValorantAccount> account = valorantAccountRepository.findById(id);
        if (account.isPresent()) {
            ValorantAccount existingAccount = account.get();
            existingAccount.setCompetitive(accountDetails.getCompetitive());
            existingAccount.setNumberOfAgents(accountDetails.getNumberOfAgents());
            existingAccount.setNumberOfWeaponSkins(accountDetails.getNumberOfWeaponSkins());
            existingAccount.setPrice(accountDetails.getPrice());
            existingAccount.setDescription(accountDetails.getDescription());
            existingAccount.setStatus(accountDetails.getStatus());
            existingAccount.setInventoryQuantity(accountDetails.getInventoryQuantity());
            existingAccount.setUsernameValorant(accountDetails.getUsernameValorant());
            existingAccount.setPasswordValorant(accountDetails.getPasswordValorant());
            existingAccount.setEmailValorant(accountDetails.getEmailValorant());
            return valorantAccountRepository.save(existingAccount);
        }
        return null;
    }
    public void deleteAccount(Integer id) {
        valorantAccountRepository.deleteById(id);
    }

//findByCompetitiveAndStatus cho khách vãng lai, người dùng, admin
    public Page<ValorantAccount> findAccountsByCompetitive(String competitive, Pageable pageable) {
        return valorantAccountRepository.findByCompetitiveAndStatus(competitive, pageable);
    }

    //findByCompetitive cho admin
    public Page<ValorantAccount> findAccountsByCompetitiveAdmin(String competitive, Pageable pageable) {
        return valorantAccountRepository.findByCompetitive(competitive, pageable);
    }
}