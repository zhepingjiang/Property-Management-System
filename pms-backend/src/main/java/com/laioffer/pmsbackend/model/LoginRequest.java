package com.laioffer.pmsbackend.model;

public record LoginRequest(
        String username,
        String password
) {
}
