package com.laioffer.pmsbackend.amenity;

import com.laioffer.pmsbackend.common.ResourceNotFoundException;
import com.laioffer.pmsbackend.model.AmenityTypeDto;
import com.laioffer.pmsbackend.model.AmenityTypeEntity;
import com.laioffer.pmsbackend.repository.AmenityTypeRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Duration;
import java.util.List;

@Service
public class AmenityTypeService {

    private final AmenityTypeRepository typeRepository;

    public AmenityTypeService(AmenityTypeRepository typeRepository) {
        this.typeRepository = typeRepository;
    }

    public List<AmenityTypeDto> getAllActiveTypes() {
        return typeRepository.findAllByIsActiveTrueOrderByNameAsc()
                .stream()
                .map(AmenityTypeDto::new)
                .toList();
    }

    public AmenityTypeDto getById(Long id) {
        AmenityTypeEntity entity = typeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Amenity type not found: " + id));
        return new AmenityTypeDto(entity);
    }

    @Transactional
    public AmenityTypeDto createType(String name, String description,
                                     Duration maxBookingDuration, Boolean isActive) {
        AmenityTypeEntity entity = new AmenityTypeEntity(
                null,
                name,
                description,
                maxBookingDuration,
                isActive != null ? isActive : Boolean.TRUE,
                null
        );
        AmenityTypeEntity saved = typeRepository.save(entity);
        return new AmenityTypeDto(saved);
    }

    @Transactional
    public void deleteType(Long id) {
        AmenityTypeEntity entity = typeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Amenity type not found: " + id));

        typeRepository.delete(entity);
    }
}
