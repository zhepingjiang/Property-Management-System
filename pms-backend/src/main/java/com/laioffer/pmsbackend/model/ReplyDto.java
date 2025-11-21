package com.laioffer.pmsbackend.model;

import java.time.Instant;

public record ReplyDto(
        Long id,
        UserDto author,
        String content,
        Instant createdAt
) {
    public ReplyDto(ReplyEntity entity) {
        this(
                entity.getId(),
                entity.getAuthor() != null ? new  UserDto(entity.getAuthor()) : null,
                entity.getContent(),
                entity.getCreatedAt()
        );
    }
}
