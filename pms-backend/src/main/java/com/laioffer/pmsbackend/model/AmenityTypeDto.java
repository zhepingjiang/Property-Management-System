package com.laioffer.pmsbackend.model;

import java.time.Duration;
import java.time.Instant;

public class AmenityTypeDto {

    private Long id;
    private String name;
    private String description;
    private Duration maxBookingDuration;
    private Boolean isActive;
    private Instant createdAt;

    public AmenityTypeDto(AmenityTypeEntity entity) {
        this.id = entity.getId();
        this.name = entity.getName();
        this.description = entity.getDescription();
        this.maxBookingDuration = entity.getMaxBookingDuration();
        this.isActive = entity.getIsActive();
        this.createdAt = entity.getCreatedAt();
    }

    public Long getId() { return id; }
    public String getName() { return name; }
    public String getDescription() { return description; }
    public Duration getMaxBookingDuration() { return maxBookingDuration; }
    public Boolean getIsActive() { return isActive; }
    public Instant getCreatedAt() { return createdAt; }
}
