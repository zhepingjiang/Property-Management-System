package com.laioffer.pmsbackend.model;

import com.laioffer.pmsbackend.model.enums.PostStatus;

import java.time.Instant;
import java.util.List;

public record PostDto(
        Long id,
        UserDto author,
        String content,
        PostStatus status,
        Instant createdAt,
        List<ReplyDto> replies
) {
    public PostDto(PostEntity entity) {
        this(
                entity.getId(),
                entity.getAuthor() != null ? new UserDto(entity.getAuthor()) : null,
                entity.getContent(),
                entity.getStatus(),
                entity.getCreatedAt(),
                entity.getReplies() == null
                        ? null
                        : entity.getReplies().stream().map(ReplyDto::new).toList()
        );
    }
}
