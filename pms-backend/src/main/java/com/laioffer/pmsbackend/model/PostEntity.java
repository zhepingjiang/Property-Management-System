package com.laioffer.pmsbackend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.laioffer.pmsbackend.common.ListToJsonConverter;
import com.laioffer.pmsbackend.model.enums.PostStatus;
import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.time.Instant;
import java.util.List;
import java.util.Objects;

@Entity
@Table(name = "posts")
public class PostEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "author_id", nullable = false)
    private Long authorId;

    @Column(columnDefinition = "text", nullable = false)
    private String content;

    @Enumerated(EnumType.STRING)
    @Column(length = 50, nullable = false)
    private PostStatus status;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt;

    // ====== Revision 1: changed field name to 'images' for consistency with frontend ======
    @Convert(converter = ListToJsonConverter.class)
    @Column(name = "image_urls", length = 2000)
    private List<String> imageUrls;

    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL)
    private List<ReplyEntity> replies;

    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "author_id", insertable = false, updatable = false,
            foreignKey = @ForeignKey(name = "fk_post_author"))
    @JsonIgnore
    private UserEntity author;

    public PostEntity() {}

    public PostEntity(Long id, Long authorId, String content, PostStatus status, List<String> imageUrls, Instant createdAt) {
        this.id = id;
        this.authorId = authorId;
        this.content = content;
        this.status = status;
        this.imageUrls = imageUrls;
        this.createdAt = createdAt;
    }

    // ====== Revision 2: added getImages() for frontend compatibility ======
    public List<String> getImages() { return imageUrls; }

    public Long getId() { return id; }
    public Long getAuthorId() { return authorId; }
    public String getContent() { return content; }
    public PostStatus getStatus() { return status; }
    public Instant getCreatedAt() { return createdAt; }
    public List<ReplyEntity> getReplies() { return replies; }
    public UserEntity getAuthor() { return author; }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof PostEntity)) return false;
        PostEntity that = (PostEntity) o;
        return Objects.equals(id, that.id);
    }

    @Override
    public int hashCode() { return Objects.hash(id); }

    @Override
    public String toString() {
        return "PostEntity{" +
                "id=" + id +
                ", authorId=" + authorId +
                ", content='" + content + '\'' +
                ", status=" + status +
                ", createdAt=" + createdAt +
                ", author=" + author +
                '}';
    }
}
