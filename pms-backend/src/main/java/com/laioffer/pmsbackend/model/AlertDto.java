package com.laioffer.pmsbackend.model;

import java.time.Instant;
import java.util.List;

public record AlertDto(
        Long id,
        String title,
        String content,
        List<String> imageUrls,
        Long createdBy,
        Instant createdAt
) {

    public AlertDto(AlertEntity entity) {
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
