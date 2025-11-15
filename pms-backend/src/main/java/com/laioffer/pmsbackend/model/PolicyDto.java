package com.laioffer.pmsbackend.model;

import java.time.Instant;

public record PolicyDto(
        Long id,
        String title,
        String content,
        Long createdBy,
        Instant createdAt
) {
    public PolicyDto(PolicyEntity entity) {
        this(
                entity.getId(),
                entity.getTitle(),
                entity.getContent(),
                entity.getCreatedBy(),
                entity.getCreatedAt()
        );
    }
}
