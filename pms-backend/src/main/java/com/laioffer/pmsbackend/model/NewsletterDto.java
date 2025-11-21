package com.laioffer.pmsbackend.model;

import java.time.Instant;
import java.util.List;

public record NewsletterDto(
        Long id,
        String title,
        String content,
        List<String> imageUrls,
        UserDto creator,
        Instant createdAt
) {

    public NewsletterDto(NewsletterEntity entity) {
        this(
                entity.getId(),
                entity.getTitle(),
                entity.getContent(),
                entity.getImageUrls(),
                entity.getCreator() != null ? new UserDto(entity.getCreator()) : null,
                entity.getCreatedAt()
        );
    }
}
