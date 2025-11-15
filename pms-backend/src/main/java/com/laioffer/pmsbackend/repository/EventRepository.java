package com.laioffer.pmsbackend.repository;

import com.laioffer.pmsbackend.model.EventEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface EventRepository extends JpaRepository<EventEntity, Long> {

    List<EventEntity> findAllByOrderByCreatedAtDesc();

    Optional<EventEntity> findFirstByOrderByCreatedAtDesc();
}
