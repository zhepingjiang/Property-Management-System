package com.laioffer.pmsbackend.model;

import com.laioffer.pmsbackend.model.enums.MaintenancePriority;
import com.laioffer.pmsbackend.model.enums.MaintenanceStatus;

import java.time.Instant;
import java.util.List;

public record MaintenanceRequestDto(
        Long id,
        Long userId,
        String facility,
        String issueType,
        String description,
        MaintenanceStatus status,
        MaintenancePriority priority,
        Long assignedTo,
        List<String> imageUrl,
        Instant createdAt,
        Instant updatedAt,
        List<ReplyDto> replies
) {
    public MaintenanceRequestDto(MaintenanceRequestEntity entity) {
        this(
                entity.getId(),
                entity.getAuthorId(),
                entity.getFacility(),
                entity.getIssueType(),
                entity.getDescription(),
                entity.getStatus(),
                entity.getPriority(),
                entity.getAssignedTo(),
                entity.getImageUrls(),
                entity.getCreatedAt(),
                entity.getUpdatedAt(),
                entity.getReplies() == null
                        ? null
                        : entity.getReplies().stream().map(ReplyDto::new).toList()
        );
    }
}
