package com.laioffer.pmsbackend.amenity;

import com.laioffer.pmsbackend.model.AmenityUnitDto;
import com.laioffer.pmsbackend.security.annotations.TrusteeOnly;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/amenities")
public class AmenityUnitController {

    private final AmenityUnitService amenityUnitService;

    public AmenityUnitController(AmenityUnitService amenityUnitService) {
        this.amenityUnitService = amenityUnitService;
    }

    // b. get all amenity units given a specific type
    @GetMapping("/types/{typeId}/units")
    public List<AmenityUnitDto> getUnitsByType(@PathVariable Long typeId) {
        return amenityUnitService.getUnitsByType(typeId);
    }

    // Trustee can create units
    @TrusteeOnly
    @PostMapping("/units")
    @ResponseStatus(HttpStatus.CREATED)
    public AmenityUnitDto createUnit(
            @RequestParam Long typeId,
            @RequestParam String label,
            @RequestParam(required = false) Integer capacity,
            @RequestParam(required = false) String address,
            @RequestParam(required = false) Boolean isActive
    ) {
        return amenityUnitService.createUnit(typeId, label, capacity, address, isActive);
    }

    @TrusteeOnly
    @DeleteMapping("/units/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteUnit(@PathVariable Long id) {
        amenityUnitService.deleteUnit(id);
    }
}
