package com.laioffer.pmsbackend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.laioffer.pmsbackend.common.ListToJsonConverter;
import com.laioffer.pmsbackend.model.enums.MaintenanceCategory;
import com.laioffer.pmsbackend.model.enums.MaintenancePriority;
import com.laioffer.pmsbackend.model.enums.MaintenanceStatus;
import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.Instant;
import java.util.List;
import java.util.Objects;

@Entity
@Table(name = "maintenance_requests")
public class MaintenanceRequestEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "author_id", nullable = false)
    private Long authorId;

    @Column(length = 120, nullable = false)
    private String title;

    @Column(length = 100, nullable = false)
    private String property;

    @Column(length = 50, nullable = false)
    private String unit;

    @Enumerated(EnumType.STRING)
    @Column(length = 40, nullable = false)
    private MaintenanceCategory category;

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

    @Column(name = "image_urls", length = 2000)
    @Convert(converter = ListToJsonConverter.class)
    private List<String> imageUrls;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false)
    private Instant updatedAt;

    @OneToMany(mappedBy = "maintenanceRequest", cascade = CascadeType.ALL)
    private List<ReplyEntity> replies;

    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "author_id", insertable = false, updatable = false,
            foreignKey = @ForeignKey(name = "fk_maintenance_request_user"))
    @JsonIgnore
    private UserEntity author;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "assigned_to", insertable = false, updatable = false,
            foreignKey = @ForeignKey(name = "fk_maintenance_request_assigned"))
    @JsonIgnore
    private UserEntity assignedUser;

    public MaintenanceRequestEntity() {}

    public MaintenanceRequestEntity(
            Long id,
            Long authorId,
            String title,
            String property,
            String unit,
            MaintenanceCategory category,
            String description,
            MaintenanceStatus status,
            MaintenancePriority priority,
            Long assignedTo,
            List<String> imageUrls
    ) {
        this.id = id;
        this.authorId = authorId;
        this.title = title;
        this.property = property;
        this.unit = unit;
        this.category = category;
        this.description = description;
        this.status = status;
        this.priority = priority;
        this.assignedTo = assignedTo;
        this.imageUrls = imageUrls;
    }

    public MaintenanceRequestEntity(
            Long id,
            Long authorId,
            String title,
            String property,
            String unit,
            MaintenanceCategory category,
            String description,
            MaintenanceStatus status,
            MaintenancePriority priority,
            Long assignedTo,
            List<String> imageUrls,
            Instant createdAt
    ) {
        this(id, authorId, title, property, unit, category,
                description, status, priority, assignedTo, imageUrls);
        this.createdAt = createdAt;
    }

    public Long getId() {
        return id;
    }

    public Long getAuthorId() {
        return authorId;
    }

    public String getTitle() {
        return title;
    }

    public String getProperty() {
        return property;
    }

    public String getUnit() {
        return unit;
    }

    public MaintenanceCategory getCategory() {
        return category;
    }

    public String getDescription() {
        return description;
    }

    public MaintenanceStatus getStatus() {
        return status;
    }

    public MaintenancePriority getPriority() {
        return priority;
    }

    public Long getAssignedTo() {
        return assignedTo;
    }

    public List<String> getImageUrls() {
        return imageUrls;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public Instant getUpdatedAt() {
        return updatedAt;
    }

    public List<ReplyEntity> getReplies() {
        return replies;
    }

    public UserEntity getAuthor() {
        return author;
    }

    public UserEntity getAssignedUser() {
        return assignedUser;
    }

    public void setStatus(MaintenanceStatus status) {
        this.status = status;
    }

    public void setPriority(MaintenancePriority priority) {
        this.priority = priority;
    }

    public void setAssignedTo(Long assignedTo) {
        this.assignedTo = assignedTo;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof MaintenanceRequestEntity)) return false;
        MaintenanceRequestEntity that = (MaintenanceRequestEntity) o;
        return Objects.equals(id, that.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    @Override
    public String toString() {
        return "MaintenanceRequestEntity{" +
                "id=" + id +
                ", authorId=" + authorId +
                ", title='" + title + '\'' +
                ", property='" + property + '\'' +
                ", unit='" + unit + '\'' +
                ", category=" + category +
                ", description='" + description + '\'' +
                ", status=" + status +
                ", priority=" + priority +
                ", assignedTo=" + assignedTo +
                ", imageUrls=" + imageUrls +
                ", createdAt=" + createdAt +
                ", updatedAt=" + updatedAt +
                ", replies=" + replies +
                ", author=" + author +
                ", assignedUser=" + assignedUser +
                '}';
    }
}
