package com.laioffer.pmsbackend.common;

public class DeleteResourceNotAllowedException extends RuntimeException {

    public DeleteResourceNotAllowedException(String message) {
        super(message);
    }
}
