package com.laioffer.pmsbackend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.time.Instant;
import java.util.Objects;

@Entity
@Table(name = "amenity_units")
public class AmenityUnitEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "type_id", nullable = false)
    private Long typeId;

    @Column(length = 100, nullable = false)
    private String label;

    @Column
    private Integer capacity;

    @Column(name = "is_active", nullable = false)
    private Boolean isActive;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "type_id", insertable = false, updatable = false,
            foreignKey = @ForeignKey(name = "fk_amenity_unit_type"))
    @JsonIgnore
    private AmenityTypeEntity type;

    public AmenityUnitEntity() {
    }

    public AmenityUnitEntity(Long id, Long typeId, String label, Integer capacity, Boolean isActive, Instant createdAt) {
        this.id = id;
        this.typeId = typeId;
        this.label = label;
        this.capacity = capacity;
        this.isActive = isActive;
        this.createdAt = createdAt;
    }

    public Long getId() { return id; }
    public Long getTypeId() { return typeId; }
    public String getLabel() { return label; }
    public Integer getCapacity() { return capacity; }
    public Boolean getIsActive() { return isActive; }
    public Instant getCreatedAt() { return createdAt; }
    public AmenityTypeEntity getType() { return type; }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof AmenityUnitEntity)) return false;
        AmenityUnitEntity that = (AmenityUnitEntity) o;
        return Objects.equals(id, that.id) &&
                Objects.equals(typeId, that.typeId) &&
                Objects.equals(label, that.label) &&
                Objects.equals(capacity, that.capacity) &&
                Objects.equals(isActive, that.isActive);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, typeId, label, capacity, isActive);
    }

    @Override
    public String toString() {
        return "AmenityUnitEntity{" +
                "id=" + id +
                ", typeId=" + typeId +
                ", label='" + label + '\'' +
                ", capacity=" + capacity +
                ", isActive=" + isActive +
                ", createdAt=" + createdAt +
                ", type=" + type +
                '}';
    }
}
