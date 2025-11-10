package com.laioffer.pmsbackend.model.enums;

/**
 * Enum representing user roles within the system.
 * <p>
 * IMPORTANT: Each role <b>must start with the prefix "ROLE_"</b> to comply with
 * Spring Security's default role-based authorization mechanism.
 * <br>
 * For example:
 * <ul>
 *   <li>{@code ROLE_RESIDENT}</li>
 *   <li>{@code ROLE_TRUSTEE}</li>
 * </ul>
 * Spring Security automatically adds "ROLE_" when evaluating expressions such as
 * {@code @PreAuthorize("hasRole('TRUSTEE')")}, so the enum values must include this prefix.
 */
public enum UserRole {
    ROLE_RESIDENT("RESIDENT"),
    ROLE_TRUSTEE("TRUSTEE");

    // Only used in @PreAuthorize
    // e.g. @PreAuthorize("hasRole('TRUSTEE')")
    private final String roleName;

    UserRole(String roleName) {
        this.roleName = roleName;
    }

    public String getRoleName() {
        return roleName;
    }
}
