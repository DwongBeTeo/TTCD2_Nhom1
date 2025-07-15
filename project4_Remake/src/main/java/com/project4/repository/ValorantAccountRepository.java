package com.project4.repository;


import com.project4.entity.ValorantAccount;
import com.project4.entity.ValorantAccount.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ValorantAccountRepository extends JpaRepository<ValorantAccount, Integer> {

    // Tìm kiếm theo account_id (dành cho admin)
    Optional<ValorantAccount> findByAccountId(Integer accountId);

    //dùng để tìm kiếm id sản phẩm j
    Optional<ValorantAccount> findById(Integer accountId);

    // Tìm kiếm theo account_id và status (ví dụ: available, dành cho buyer)
    Optional<ValorantAccount> findByAccountIdAndStatus(Integer accountId, Status status);

    // Tìm kiếm theo từ khóa trong username_valorant hoặc description (dành cho admin)
    @Query("SELECT va FROM ValorantAccount va WHERE va.usernameValorant LIKE %:keyword% OR va.description LIKE %:keyword%")
    List<ValorantAccount> searchByKeyword(String keyword);

    // Tìm kiếm theo từ khóa cho buyer (chỉ lấy status=available)
    @Query("SELECT va FROM ValorantAccount va WHERE (va.usernameValorant LIKE %:keyword% OR va.description LIKE %:keyword%) AND va.status = 'available'")
    List<ValorantAccount> searchByKeywordForBuyer(String keyword);

//    // Tìm kiếm theo competitive (giữ nguyên của bạn, không phân biệt hoa thường, hỗ trợ phân trang)
//    @Query("SELECT v FROM ValorantAccount v WHERE LOWER(v.competitive) = LOWER(:competitive)")
//    Page<ValorantAccount> findByCompetitive(@Param("competitive") String competitive, Pageable pageable);

    // Tìm kiếm theo competitive (hỗ trợ partial matching, không phân biệt hoa thường, phân trang)
    @Query("SELECT v FROM ValorantAccount v WHERE LOWER(v.competitive) LIKE LOWER(CONCAT('%', :competitive, '%'))")
    Page<ValorantAccount> findByCompetitive(@Param("competitive") String competitive, Pageable pageable);

    // Tìm kiếm theo competitive cho buyer (chỉ lấy status=available, partial matching)
    @Query("SELECT v FROM ValorantAccount v WHERE LOWER(v.competitive) LIKE LOWER(CONCAT('%', :competitive, '%')) AND v.status = 'available'")
    Page<ValorantAccount> findByCompetitiveAndStatus(@Param("competitive") String competitive, Pageable pageable);

    // Lấy tất cả tài khoản có status = 'available' với phân trang
    @Query("SELECT v FROM ValorantAccount v WHERE v.status = 'available'")
    Page<ValorantAccount> findAllByStatusAvailable(Pageable pageable);

    @Modifying
    @Query("UPDATE ValorantAccount va SET va.inventoryQuantity = :newQuantity WHERE va.accountId = :accountId")
    void updateInventoryQuantity(@Param("accountId") Integer accountId, @Param("newQuantity") Integer newQuantity);

    @Modifying
    @Query("UPDATE ValorantAccount va SET va.status = :status WHERE va.accountId = :accountId")
    void updateStatus(@Param("accountId") Integer accountId, @Param("status") ValorantAccount.Status status);
}