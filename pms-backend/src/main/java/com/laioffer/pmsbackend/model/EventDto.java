package com.laioffer.pmsbackend.model;

import java.time.Instant;
import java.util.List;

public record EventDto(
        Long id,
        String title,
        String content,
        List<String> imageUrls,
        Long createdBy,
        Instant createdAt
) {
    public EventDto(EventEntity entity) {
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
