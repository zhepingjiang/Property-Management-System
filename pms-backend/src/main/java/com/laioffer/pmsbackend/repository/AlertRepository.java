package com.laioffer.pmsbackend.repository;

import com.laioffer.pmsbackend.model.AlertEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface AlertRepository extends JpaRepository<AlertEntity, Long> {

    List<AlertEntity> findAllByOrderByCreatedAtDesc();

    Optional<AlertEntity> findFirstByOrderByCreatedAtDesc();
}
