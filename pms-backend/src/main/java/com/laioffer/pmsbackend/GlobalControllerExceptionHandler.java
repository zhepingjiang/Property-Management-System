package com.laioffer.pmsbackend;

import com.laioffer.pmsbackend.common.DeleteResourceNotAllowedException;
import com.laioffer.pmsbackend.common.ResourceNotFoundException;
import com.laioffer.pmsbackend.model.ErrorResponse;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalControllerExceptionHandler {

    // When finding by an id, but could not find the related entity
    @ExceptionHandler(EntityNotFoundException.class)
    public final ResponseEntity<ErrorResponse> handleException(EntityNotFoundException e) {
        return new ResponseEntity<>(new ErrorResponse(
                "Entity not found",
                "entity_not_found"),
                HttpStatus.NOT_FOUND
        );
    }

    @ExceptionHandler(ResourceNotFoundException.class)
    public final ResponseEntity<ErrorResponse> handleException(ResourceNotFoundException e) {
        return new ResponseEntity<>(new ErrorResponse(
                "Resource not found",
                "resource_not_found"),
                HttpStatus.NOT_FOUND
        );
    }

    @ExceptionHandler(DeleteResourceNotAllowedException.class)
    public final ResponseEntity<ErrorResponse> handleException(DeleteResourceNotAllowedException e) {
        return new ResponseEntity<>(new ErrorResponse(
                "Delete resource not allowed",
                "delete_resource_not_allowed"),
                HttpStatus.FORBIDDEN
        );
    }
}
