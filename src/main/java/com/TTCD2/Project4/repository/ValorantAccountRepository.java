package com.TTCD2.Project4.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.TTCD2.Project4.entity.ValorantAccount;
import com.TTCD2.Project4.entity.ValorantAccount.Status;


public interface ValorantAccountRepository extends JpaRepository<ValorantAccount, Integer> {
	Page<ValorantAccount> findByStatus(Status status, Pageable pageable);
}
