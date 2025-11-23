package com.laioffer.pmsbackend.repository;

import com.laioffer.pmsbackend.model.AmenityTypeEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AmenityTypeRepository extends JpaRepository<AmenityTypeEntity, Long> {

    List<AmenityTypeEntity> findAllByIsActiveTrueOrderByNameAsc();
}
