package com.laioffer.pmsbackend.model;

import java.time.Instant;

public class AmenityUnitDto {

    private Long id;
    private AmenityTypeDto type;
    private String label;
    private Integer capacity;
    private String address;
    private Boolean isActive;
    private Instant createdAt;

    public AmenityUnitDto(AmenityUnitEntity entity) {
        this.id = entity.getId();
        this.type = entity.getType() != null ? new AmenityTypeDto(entity.getType()) : null;
        this.label = entity.getLabel();
        this.capacity = entity.getCapacity();
        this.address = entity.getAddress();
        this.isActive = entity.getIsActive();
        this.createdAt = entity.getCreatedAt();
    }

    public Long getId() { return id; }
    public AmenityTypeDto getType() { return type; }
    public String getLabel() { return label; }
    public Integer getCapacity() { return capacity; }
    public String getAddress() { return address; }
    public Boolean getIsActive() { return isActive; }
    public Instant getCreatedAt() { return createdAt; }
}
