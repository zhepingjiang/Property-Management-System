package com.laioffer.pmsbackend.model;

import java.time.Instant;
import java.util.List;

public record NewsletterDto(
        Long id,
        String title,
        String content,
        List<String> imageUrls,
        Long createdBy,
        Instant createdAt
) {

    public NewsletterDto(NewsletterEntity entity) {
        this(
                entity.getId(),
                entity.getTitle(),
                entity.getContent(),
                entity.getImageUrls(),
                entity.getCreatedBy(),
                entity.getCreatedAt()
        );
    }
}
