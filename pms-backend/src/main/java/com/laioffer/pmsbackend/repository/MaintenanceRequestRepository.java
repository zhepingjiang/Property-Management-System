package com.laioffer.pmsbackend.repository;

import com.laioffer.pmsbackend.model.MaintenanceRequestEntity;
import com.laioffer.pmsbackend.model.enums.MaintenancePriority;
import com.laioffer.pmsbackend.model.enums.MaintenanceStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MaintenanceRequestRepository extends JpaRepository<MaintenanceRequestEntity, Long> {

    /* ================================
       BASIC QUERIES
    ================================= */
    List<MaintenanceRequestEntity> findAllByOrderByCreatedAtDesc();

    List<MaintenanceRequestEntity> findAllByAuthorIdOrderByCreatedAtDesc(Long authorId);

    List<MaintenanceRequestEntity> findAllByAssignedToOrderByCreatedAtDesc(Long assignedTo);

    /* ================================
       STATUS UPDATE
    ================================= */
    @Modifying
    @Query("UPDATE MaintenanceRequestEntity r SET r.status = :status WHERE r.id = :id")
    void updateStatus(@Param("id") Long id, @Param("status") MaintenanceStatus status);

    /* ================================
       PRIORITY UPDATE
    ================================= */
    @Modifying
    @Query("UPDATE MaintenanceRequestEntity r SET r.priority = :priority WHERE r.id = :id")
    void updatePriority(@Param("id") Long id, @Param("priority") MaintenancePriority priority);

    /* ================================
       ASSIGNED TO UPDATE
    ================================= */
    @Modifying
    @Query("UPDATE MaintenanceRequestEntity r SET r.assignedTo = :assignedTo WHERE r.id = :id")
    void updateAssignedTo(@Param("id") Long id, @Param("assignedTo") Long assignedTo);
}
