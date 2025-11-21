package com.laioffer.pmsbackend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.time.Instant;
import java.util.Objects;

@Entity
@Table(name = "replies")
public class ReplyEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long authorId;

    @Column(columnDefinition = "text", nullable = false)
    private String content;

    @CreationTimestamp
    private Instant createdAt;

    /* ========== FK links ========== */
    @Column(name = "post_id")
    private Long postId;

    @Column(name = "maintenance_request_id")
    private Long maintenanceRequestId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "post_id", insertable = false, updatable = false)
    @JsonIgnore
    private PostEntity post;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "maintenance_request_id", insertable = false, updatable = false)
    @JsonIgnore
    private MaintenanceRequestEntity maintenanceRequest;

    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "author_id", insertable = false, updatable = false,
            foreignKey = @ForeignKey(name = "fk_reply_author"))
    @JsonIgnore
    private UserEntity author;

    public ReplyEntity(Long id, Long authorId, String content, Long postId, Long maintenanceRequestId) {
        this.id = id;
        this.authorId = authorId;
        this.content = content;
        this.postId = postId;
        this.maintenanceRequestId = maintenanceRequestId;
    }

    public ReplyEntity() {
    }

    public Long getId() {
        return id;
    }

    public Long getAuthorId() {
        return authorId;
    }

    public String getContent() {
        return content;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public Long getPostId() {
        return postId;
    }

    public Long getMaintenanceRequestId() {
        return maintenanceRequestId;
    }

    public PostEntity getPost() {
        return post;
    }

    public MaintenanceRequestEntity getMaintenanceRequest() {
        return maintenanceRequest;
    }

    public UserEntity getAuthor() {
        return author;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof ReplyEntity)) return false;
        ReplyEntity that = (ReplyEntity) o;
        return Objects.equals(id, that.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    @Override
    public String toString() {
        return "ReplyEntity{" +
                "id=" + id +
                ", authorId=" + authorId +
                ", content='" + content + '\'' +
                ", createdAt=" + createdAt +
                ", postId=" + postId +
                ", maintenanceRequestId=" + maintenanceRequestId +
                ", post=" + post +
                ", maintenanceRequest=" + maintenanceRequest +
                ", author=" + author +
                '}';
    }
}
