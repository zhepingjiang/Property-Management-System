package com.laioffer.pmsbackend.security.annotations;

import org.springframework.security.access.prepost.PreAuthorize;

import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;

/**
 * Annotation for endpoints that only users with TRUSTEE role can access.
 */
@Retention(RetentionPolicy.RUNTIME)
@PreAuthorize("hasRole(T(com.laioffer.pmsbackend.model.enums.UserRole).ROLE_TRUSTEE.getRoleName())")
public @interface TrusteeOnly {
}
