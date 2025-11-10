package com.laioffer.pmsbackend.authentication;

public class UserAlreadyExistException extends RuntimeException {
    public UserAlreadyExistException(String username) {
        super(String.format("User with name %s already exists", username));
    }
}
