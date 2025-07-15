package com.TTCD2.Project4.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.TTCD2.Project4.entity.ValorantAccount;
import com.TTCD2.Project4.entity.ValorantAccount.Status;


public interface ValorantAccountRepository extends JpaRepository<ValorantAccount, Integer> {
	// Lấy danh sách tài khoản có inventoryQuantity > 0
    List<ValorantAccount> findByInventoryQuantityGreaterThan(Integer quantity);

    // Lấy danh sách phân trang theo Status
    Page<ValorantAccount> findByStatus(Status status, Pageable pageable);

    // Thêm phương thức lọc theo Status.available và inventoryQuantity > 0
    List<ValorantAccount> findByStatusAndInventoryQuantityGreaterThan(Status status, Integer quantity);

    // Thêm phương thức phân trang theo Status.available và inventoryQuantity > 0
    Page<ValorantAccount> findByStatusAndInventoryQuantityGreaterThan(Status status, Integer quantity, Pageable pageable);

    //Tim kiem theo id và userNameValorant
    @Query("SELECT va FROM ValorantAccount va WHERE va.status = 'available' AND (va.accountId = :searchTerm OR va.usernameValorant LIKE %:searchTerm%)")
    Page<ValorantAccount> findByAccountIdOrUsername(@Param("searchTerm") String searchTerm, Pageable pageable);
}
