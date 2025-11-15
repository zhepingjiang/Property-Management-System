package com.laioffer.pmsbackend.repository;

import com.laioffer.pmsbackend.model.PolicyEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PolicyRepository extends JpaRepository<PolicyEntity, Long> {

    List<PolicyEntity> findAllByOrderByCreatedAtDesc();

    Optional<PolicyEntity> findFirstByOrderByCreatedAtDesc();
}
