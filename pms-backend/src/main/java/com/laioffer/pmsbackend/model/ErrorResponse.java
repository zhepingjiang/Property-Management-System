package com.laioffer.pmsbackend.model;

public record ErrorResponse(
        String message,
        String error
) {
}
