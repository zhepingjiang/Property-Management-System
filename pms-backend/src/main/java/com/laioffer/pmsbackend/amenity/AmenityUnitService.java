package com.laioffer.pmsbackend.amenity;

import com.laioffer.pmsbackend.common.ResourceNotFoundException;
import com.laioffer.pmsbackend.model.AmenityTypeEntity;
import com.laioffer.pmsbackend.model.AmenityUnitDto;
import com.laioffer.pmsbackend.model.AmenityUnitEntity;
import com.laioffer.pmsbackend.repository.AmenityTypeRepository;
import com.laioffer.pmsbackend.repository.AmenityUnitRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class AmenityUnitService {

    private final AmenityUnitRepository unitRepository;
    private final AmenityTypeRepository typeRepository;

    public AmenityUnitService(AmenityUnitRepository unitRepository,
                              AmenityTypeRepository typeRepository) {
        this.unitRepository = unitRepository;
        this.typeRepository = typeRepository;
    }

    public List<AmenityUnitDto> getUnitsByType(Long typeId) {
        // Ensure type exists (optional but nice)
        typeRepository.findById(typeId)
                .orElseThrow(() -> new ResourceNotFoundException("Amenity type not found: " + typeId));

        return unitRepository.findAllByTypeIdAndIsActiveTrueOrderByLabelAsc(typeId)
                .stream()
                .map(AmenityUnitDto::new)
                .toList();
    }

    @Transactional
    public AmenityUnitDto createUnit(
            Long typeId,
            String label,
            Integer capacity,
            String address,
            Boolean isActive
    ) {
        AmenityTypeEntity type = typeRepository.findById(typeId)
                .orElseThrow(() -> new ResourceNotFoundException("Amenity type not found: " + typeId));

        AmenityUnitEntity unit = new AmenityUnitEntity(
                null,
                type.getId(),
                label,
                capacity,
                address,
                isActive != null ? isActive : Boolean.TRUE,
                null
        );

        AmenityUnitEntity saved = unitRepository.save(unit);
        return new AmenityUnitDto(saved);
    }

    public void deleteUnit(Long id) {
        AmenityUnitEntity entity = unitRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Amenity unit not found: " + id));

        unitRepository.delete(entity);
    }
}
