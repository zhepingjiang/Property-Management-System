package com.laioffer.pmsbackend.model;

import com.laioffer.pmsbackend.model.enums.AmenityBookingStatus;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;

public class AmenityBookingDto {

    private Long id;
    private AmenityUnitDto unit;
    private UserDto user;
    private Integer guestCount;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private AmenityBookingStatus status;
    private Instant createdAt;

    public AmenityBookingDto(AmenityBookingEntity entity) {
        this.id = entity.getId();
        this.unit = entity.getUnit() != null ?  new AmenityUnitDto(entity.getUnit()) : null;
        this.user = entity.getUser()  != null ? new UserDto(entity.getUser()) : null;
        this.guestCount = entity.getGuestCount();
        ZoneId zone  = ZoneId.systemDefault();
        this.startTime = entity.getStartTime().atZone(zone).toLocalDateTime();
        this.endTime = entity.getEndTime().atZone(zone).toLocalDateTime();
        this.status = entity.getStatus();
        this.createdAt = entity.getCreatedAt();
    }

    public Long getId() { return id; }
    public AmenityUnitDto getUnit() { return unit; }
    public UserDto getUser() { return user; }
    public Integer getGuestCount() { return guestCount; }
    public  LocalDateTime getStartTime() { return startTime; }
    public  LocalDateTime getEndTime() { return endTime; }
    public AmenityBookingStatus getStatus() { return status; }
    public Instant getCreatedAt() { return createdAt; }
}
