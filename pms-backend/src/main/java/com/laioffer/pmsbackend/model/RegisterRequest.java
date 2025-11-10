package com.laioffer.pmsbackend.model;

import com.laioffer.pmsbackend.model.enums.UserRole;

public record RegisterRequest(
        String username,
        String password,
        String email,
        UserRole role
) {
}
