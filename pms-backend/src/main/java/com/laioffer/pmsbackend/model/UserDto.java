package com.laioffer.pmsbackend.model;

import com.laioffer.pmsbackend.model.enums.UserRole;

import java.time.Instant;

public record UserDto(
        Long id,
        String username,
        String email,
        UserRole role,
        Instant createdAt
) {
    public UserDto(UserEntity userEntity) {
        this(
                userEntity.getId(),
                userEntity.getUsername(),
                userEntity.getEmail(),
                userEntity.getRole(),
                userEntity.getCreatedAt());
    }
}
