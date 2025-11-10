package com.laioffer.pmsbackend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.laioffer.pmsbackend.model.enums.AmenityBookingStatus;
import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.time.Instant;
import java.util.Objects;

@Entity
@Table(name = "amenity_bookings")
public class AmenityBookingEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "unit_id", nullable = false)
    private Long unitId;

    @Column(name = "user_id", nullable = false)
    private Long userId;

    @Column(name = "guest_count", nullable = false)
    private Integer guestCount;

    @Column(name = "start_time", nullable = false)
    private Instant startTime;

    @Column(name = "end_time", nullable = false)
    private Instant endTime;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private AmenityBookingStatus status;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "unit_id", insertable = false, updatable = false,
            foreignKey = @ForeignKey(name = "fk_amenity_booking_unit"))
    @JsonIgnore
    private AmenityUnitEntity unit;

    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "user_id", insertable = false, updatable = false,
            foreignKey = @ForeignKey(name = "fk_amenity_booking_user"))
    @JsonIgnore
    private UserEntity user;

    public AmenityBookingEntity() {}

    public AmenityBookingEntity(Long id, Long unitId, Long userId, Integer guestCount, Instant startTime,
                                Instant endTime, AmenityBookingStatus status, Instant createdAt) {
        this.id = id;
        this.unitId = unitId;
        this.userId = userId;
        this.guestCount = guestCount;
        this.startTime = startTime;
        this.endTime = endTime;
        this.status = status;
        this.createdAt = createdAt;
    }

    public Long getId() { return id; }
    public Long getUnitId() { return unitId; }
    public Long getUserId() { return userId; }
    public Integer getGuestCount() { return guestCount; }
    public Instant getStartTime() { return startTime; }
    public Instant getEndTime() { return endTime; }
    public AmenityBookingStatus getStatus() { return status; }
    public Instant getCreatedAt() { return createdAt; }
    public AmenityUnitEntity getUnit() { return unit; }
    public UserEntity getUser() { return user; }

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        AmenityBookingEntity that = (AmenityBookingEntity) o;
        return Objects.equals(id, that.id)
                && Objects.equals(unitId, that.unitId)
                && Objects.equals(userId, that.userId)
                && Objects.equals(guestCount, that.guestCount)
                && Objects.equals(startTime, that.startTime)
                && Objects.equals(endTime, that.endTime)
                && status == that.status
                && Objects.equals(unit, that.unit);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, unitId, userId, guestCount, startTime, endTime, status, unit);
    }

    @Override
    public String toString() {
        return "AmenityBookingEntity{" +
                "id=" + id +
                ", unitId=" + unitId +
                ", userId=" + userId +
                ", guestCount=" + guestCount +
                ", startTime=" + startTime +
                ", endTime=" + endTime +
                ", status=" + status +
                ", createdAt=" + createdAt +
                ", unit=" + unit +
                ", user=" + user +
                '}';
    }
}