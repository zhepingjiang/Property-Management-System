package com.laioffer.pmsbackend.amenity;

import com.laioffer.pmsbackend.model.AmenityTypeDto;
import com.laioffer.pmsbackend.security.annotations.TrusteeOnly;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.Duration;
import java.util.List;

@RestController
@RequestMapping("/api/amenities/types")
public class AmenityTypeController {

    private final AmenityTypeService amenityTypeService;

    public AmenityTypeController(AmenityTypeService amenityTypeService) {
        this.amenityTypeService = amenityTypeService;
    }

    // a. get all amenity types
    @GetMapping
    public List<AmenityTypeDto> getAllTypes() {
        return amenityTypeService.getAllActiveTypes();
    }

    @GetMapping("/{id}")
    public AmenityTypeDto getTypeById(@PathVariable Long id) {
        return amenityTypeService.getById(id);
    }

    // Trustee can create types
    @TrusteeOnly
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public AmenityTypeDto createType(
            @RequestParam String name,
            @RequestParam(required = false) String description,
            @RequestParam(required = false) Long maxBookingDurationMinutes,
            @RequestParam(required = false) List<MultipartFile> images,
            @RequestParam(required = false) Boolean isActive
    ) {
        Duration maxDuration = null;
        if (maxBookingDurationMinutes != null) {
            maxDuration = Duration.ofMinutes(maxBookingDurationMinutes);
        }
        return amenityTypeService.createType(name, description, maxDuration, images, isActive);
    }

    @TrusteeOnly
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteType(@PathVariable Long id) {
        amenityTypeService.deleteType(id);
    }
}
