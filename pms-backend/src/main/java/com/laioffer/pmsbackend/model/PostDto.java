package com.laioffer.pmsbackend.model;

import com.laioffer.pmsbackend.model.enums.PostStatus;

import java.time.Instant;
import java.util.List;

public record PostDto(
        Long id,
        Long authorId,
        String content,
        List<String> imageUrls,
        PostStatus status,
        Instant createdAt
) {

    public PostDto(PostEntity entity) {
        this(
                entity.getId(),
                entity.getAuthorId(),
                entity.getContent(),
                entity.getImageUrls(),
                entity.getStatus(),
                entity.getCreatedAt()
        );
    }
}