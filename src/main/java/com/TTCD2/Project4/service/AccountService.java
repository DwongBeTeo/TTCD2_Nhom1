package com.TTCD2.Project4.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.TTCD2.Project4.entity.Game;
import com.TTCD2.Project4.entity.LienQuanAccount;
import com.TTCD2.Project4.entity.PUBGAccount;
import com.TTCD2.Project4.entity.Transaction;
import com.TTCD2.Project4.entity.Users;
import com.TTCD2.Project4.entity.ValorantAccount;
import com.TTCD2.Project4.repository.GameRepository;
import com.TTCD2.Project4.repository.LienQuanAccountRepository;
import com.TTCD2.Project4.repository.PUBGAccountRepository;
import com.TTCD2.Project4.repository.TransactionRepository;
import com.TTCD2.Project4.repository.UsersRepository;
import com.TTCD2.Project4.repository.ValorantAccountRepository;

@Service
public class AccountService {

    @Autowired
    private LienQuanAccountRepository lienQuanAccountRepository;

    @Autowired
    private ValorantAccountRepository valorantAccountRepository;

    @Autowired
    private PUBGAccountRepository pubgAccountRepository;

    @Autowired
    private GameRepository gameRepository;

    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private UsersRepository usersRepository;
    
    public List<LienQuanAccount> getAllAvailableLienQuanAccounts() {
        try {
            List<LienQuanAccount> accounts = lienQuanAccountRepository.findAll();
            System.out.println("LienQuan Accounts (raw): " + accounts);
            List<LienQuanAccount> availableAccounts = accounts.stream()
                    .filter(acc -> acc.getStatus() == LienQuanAccount.Status.available)
                    .toList();
            System.out.println("LienQuan Accounts (filtered): " + availableAccounts);
            return availableAccounts;
        } catch (Exception e) {
            System.err.println("Error fetching LienQuan accounts: " + e.getMessage());
            e.printStackTrace();
            return new ArrayList<>();
        }
    }

    public Page<ValorantAccount> getAllAvailableValorantAccounts(Pageable pageable) {
        try {
            Page<ValorantAccount> accountPage = valorantAccountRepository.findByStatus(ValorantAccount.Status.available, pageable);
            System.out.println("Valorant Accounts (filtered): " + accountPage.getContent());
            return accountPage;
        } catch (Exception e) {
            System.err.println("Error fetching Valorant accounts: " + e.getMessage());
            e.printStackTrace();
            return Page.empty(pageable); // Trả về trang rỗng nếu có lỗi
        }
    }
    
    public List<ValorantAccount> getAllAvailableValorantAccounts() {
        try {
            List<ValorantAccount> accounts = valorantAccountRepository.findAll();
            System.out.println("Valorant Accounts (raw): " + accounts);
            List<ValorantAccount> availableAccounts = accounts.stream()
                    .filter(acc -> acc.getStatus() == ValorantAccount.Status.available)
                    .toList();
            System.out.println("Valorant Accounts (filtered): " + availableAccounts);
            return availableAccounts;
        } catch (Exception e) {
            System.err.println("Error fetching Valorant accounts: " + e.getMessage());
            e.printStackTrace();
            return new ArrayList<>();
        }
    }

    public List<PUBGAccount> getAllAvailablePubgAccounts() {
        try {
            List<PUBGAccount> accounts = pubgAccountRepository.findAll();
            System.out.println("PUBG Accounts (raw): " + accounts);
            List<PUBGAccount> availableAccounts = accounts.stream()
                    .filter(acc -> acc.getStatus() == PUBGAccount.Status.available)
                    .toList();
            System.out.println("PUBG Accounts (filtered): " + availableAccounts);
            return availableAccounts;
        } catch (Exception e) {
            System.err.println("Error fetching PUBG accounts: " + e.getMessage());
            e.printStackTrace();
            return new ArrayList<>();
        }
    }

//    
}