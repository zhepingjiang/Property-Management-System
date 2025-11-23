package com.laioffer.pmsbackend.model;

import com.laioffer.pmsbackend.model.enums.AmenityBookingStatus;

import java.time.Instant;

public class AmenityBookingDto {

    private Long id;
    private AmenityUnitDto unit;
    private UserDto user;
    private Integer guestCount;
    private Instant startTime;
    private Instant endTime;
    private AmenityBookingStatus status;
    private Instant createdAt;

    public AmenityBookingDto(AmenityBookingEntity entity) {
        this.id = entity.getId();
        this.unit = entity.getUnit() != null ?  new AmenityUnitDto(entity.getUnit()) : null;
        this.user = entity.getUser()  != null ? new UserDto(entity.getUser()) : null;
        this.guestCount = entity.getGuestCount();
        this.startTime = entity.getStartTime();
        this.endTime = entity.getEndTime();
        this.status = entity.getStatus();
        this.createdAt = entity.getCreatedAt();
    }

    public Long getId() { return id; }
    public AmenityUnitDto getUnit() { return unit; }
    public UserDto getUser() { return user; }
    public Integer getGuestCount() { return guestCount; }
    public Instant getStartTime() { return startTime; }
    public Instant getEndTime() { return endTime; }
    public AmenityBookingStatus getStatus() { return status; }
    public Instant getCreatedAt() { return createdAt; }
}
