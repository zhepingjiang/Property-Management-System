package com.laioffer.pmsbackend.model;

import com.laioffer.pmsbackend.common.ListToJsonConverter;
import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.time.Duration;
import java.time.Instant;
import java.util.List;
import java.util.Objects;

@Entity
@Table(name = "amenity_types")
public class AmenityTypeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(columnDefinition = "text")
    private String description;

    @JdbcTypeCode(SqlTypes.DURATION)
    @Column(name = "max_booking_duration")
    private Duration maxBookingDuration;

    @Column(name = "image_urls")
    @Convert(converter = ListToJsonConverter.class)
    private List<String> imageUrls;

    @Column(name = "is_active", nullable = false)
    private Boolean isActive;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt;

    public AmenityTypeEntity() {
    }

    public AmenityTypeEntity
            (Long id,
             String name,
             String description,
             Duration maxBookingDuration,
             List<String> imageUrls,
             Boolean isActive,
             Instant createdAt) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.maxBookingDuration = maxBookingDuration;
        this.imageUrls = imageUrls;
        this.isActive = isActive;
        this.createdAt = createdAt;
    }

    public Long getId() { return id; }
    public String getName() { return name; }
    public String getDescription() { return description; }
    public Duration getMaxBookingDuration() { return maxBookingDuration; }
    public List<String> getImageUrls() { return imageUrls; }
    public Boolean getIsActive() { return isActive; }
    public Instant getCreatedAt() { return createdAt; }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof AmenityTypeEntity)) return false;
        AmenityTypeEntity that = (AmenityTypeEntity) o;
        return Objects.equals(id, that.id) &&
                Objects.equals(name, that.name) &&
                Objects.equals(description, that.description) &&
                Objects.equals(maxBookingDuration, that.maxBookingDuration) &&
                Objects.equals(isActive, that.isActive);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, description, maxBookingDuration, isActive);
    }

    @Override
    public String toString() {
        return "AmenityTypeEntity{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", maxBookingDuration=" + maxBookingDuration +
                ", isActive=" + isActive +
                ", createdAt=" + createdAt +
                '}';
    }
}
