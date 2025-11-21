package com.laioffer.pmsbackend.repository;

import com.laioffer.pmsbackend.model.ReplyEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReplyRepository extends JpaRepository<ReplyEntity, Long> {

    List<ReplyEntity> findAllByPostIdOrderByCreatedAtAsc(Long postId);

    List<ReplyEntity> findAllByMaintenanceRequestIdOrderByCreatedAtAsc(Long maintenanceRequestId);
}
