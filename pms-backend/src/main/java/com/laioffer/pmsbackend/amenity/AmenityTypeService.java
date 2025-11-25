package com.laioffer.pmsbackend.amenity;

import com.laioffer.pmsbackend.common.ResourceNotFoundException;
import com.laioffer.pmsbackend.model.AmenityTypeDto;
import com.laioffer.pmsbackend.model.AmenityTypeEntity;
import com.laioffer.pmsbackend.repository.AmenityTypeRepository;
import com.laioffer.pmsbackend.storage.ImageStorageService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.time.Duration;
import java.util.List;

@Service
public class AmenityTypeService {

    private final AmenityTypeRepository typeRepository;
    private final ImageStorageService imageStorageService;

    public AmenityTypeService(
            AmenityTypeRepository typeRepository,
            ImageStorageService imageStorageService
    ) {
        this.typeRepository = typeRepository;
        this.imageStorageService = imageStorageService;
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
    public AmenityTypeDto createType(
            String name,
            String description,
            Duration maxBookingDuration,
            List<MultipartFile> images,
            Boolean isActive
    ) {
        List<String> uploaded = images == null
                ? List.of()
                : images.stream()
                .filter(img -> !img.isEmpty())
                .map(imageStorageService::upload)
                .toList();

        AmenityTypeEntity entity = new AmenityTypeEntity(
                null,
                name,
                description,
                maxBookingDuration,
                uploaded,
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
