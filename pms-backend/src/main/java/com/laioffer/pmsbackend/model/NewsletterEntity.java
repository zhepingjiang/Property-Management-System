package com.laioffer.pmsbackend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.laioffer.pmsbackend.common.ListToJsonConverter;
import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.time.Instant;
import java.util.List;
import java.util.Objects;

@Entity
@Table(name = "newsletters")
public class NewsletterEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 200, nullable = false)
    private String title;

    @Column(columnDefinition = "text", nullable = false)
    private String content;

    @Column(name = "image_urls")
    @Convert(converter = ListToJsonConverter.class)
    private List<String> imageUrls;

    @Column(name = "created_by", nullable = false)
    private Long createdBy;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "created_by", insertable = false, updatable = false,
            foreignKey = @ForeignKey(name = "fk_newsletter_creator"))
    @JsonIgnore
    private UserEntity creator;

    public NewsletterEntity() {
    }

    public NewsletterEntity(Long id, String title, String content, List<String> imageUrls, Long createdBy, Instant createdAt) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.imageUrls = imageUrls;
        this.createdBy = createdBy;
        this.createdAt = createdAt;
    }

    public Long getId() { return id; }
    public String getTitle() { return title; }
    public String getContent() { return content; }
    public List<String> getImageUrls() { return imageUrls; }
    public Long getCreatedBy() { return createdBy; }
    public Instant getCreatedAt() { return createdAt; }
    public UserEntity getCreator() { return creator; }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof NewsletterEntity)) return false;
        NewsletterEntity that = (NewsletterEntity) o;
        return Objects.equals(id, that.id) &&
                Objects.equals(title, that.title) &&
                Objects.equals(content, that.content) &&
                Objects.equals(createdBy, that.createdBy);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, title, content, createdBy);
    }

    @Override
    public String toString() {
        return "NewsletterEntity{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", content='" + content + '\'' +
                ", createdBy=" + createdBy +
                ", createdAt=" + createdAt +
                ", creator=" + creator +
                '}';
    }
}
