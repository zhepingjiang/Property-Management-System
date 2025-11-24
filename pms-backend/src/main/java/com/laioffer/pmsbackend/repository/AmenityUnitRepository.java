package com.laioffer.pmsbackend.repository;

import com.laioffer.pmsbackend.model.AmenityUnitEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AmenityUnitRepository extends JpaRepository<AmenityUnitEntity, Long> {

    List<AmenityUnitEntity> findAllByTypeIdAndIsActiveTrueOrderByLabelAsc(Long typeId);
}
