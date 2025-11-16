package com.laioffer.pmsbackend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.laioffer.pmsbackend.model.enums.MaintenancePriority;
import com.laioffer.pmsbackend.model.enums.MaintenanceStatus;
import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.Instant;
import java.util.Objects;

@Entity
@Table(name = "maintenance_requests")
public class MaintenanceRequestEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id", nullable = false)
    private Long userId;

    @Column(length = 100, nullable = false)
    private String facility;

    @Column(name = "issue_type", length = 50, nullable = false)
    private String issueType;

    @Column(columnDefinition = "text")
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(length = 20, nullable = false)
    private MaintenanceStatus status;

    @Enumerated(EnumType.STRING)
    @Column(length = 20, nullable = false)
    private MaintenancePriority priority;

    @Column(name = "assigned_to")
    private Long assignedTo;

    @Column(name = "image_url", columnDefinition = "text")
    private String imageUrl;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false)
    private Instant updatedAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "user_id", insertable = false, updatable = false,
            foreignKey = @ForeignKey(name = "fk_maintenance_request_user"))
    @JsonIgnore
    private UserEntity user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "assigned_to", insertable = false, updatable = false,
            foreignKey = @ForeignKey(name = "fk_maintenance_request_assigned"))
    @JsonIgnore
    private UserEntity assignedUser;

    public MaintenanceRequestEntity() {}

    // Full-args constructor and getters omitted for brevity

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof MaintenanceRequestEntity)) return false;
        MaintenanceRequestEntity that = (MaintenanceRequestEntity) o;
        return Objects.equals(id, that.id) &&
                Objects.equals(userId, that.userId) &&
                Objects.equals(facility, that.facility) &&
                Objects.equals(issueType, that.issueType) &&
                Objects.equals(description, that.description) &&
                status == that.status &&
                priority == that.priority &&
                Objects.equals(assignedTo, that.assignedTo) &&
                Objects.equals(imageUrl, that.imageUrl);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, userId, facility, issueType, description, status, priority, assignedTo, imageUrl);
    }

    @Override
    public String toString() {
        return "MaintenanceRequestEntity{" +
                "id=" + id +
                ", userId=" + userId +
                ", facility='" + facility + '\'' +
                ", issueType='" + issueType + '\'' +
                ", description='" + description + '\'' +
                ", status=" + status +
                ", priority=" + priority +
                ", assignedTo=" + assignedTo +
                ", imageUrl='" + imageUrl + '\'' +
                ", createdAt=" + createdAt +
                ", updatedAt=" + updatedAt +
                ", user=" + user +
                ", assignedUser=" + assignedUser +
                '}';
    }
}
