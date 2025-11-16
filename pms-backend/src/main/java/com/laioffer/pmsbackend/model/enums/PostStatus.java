package com.laioffer.pmsbackend.model.enums;

public enum PostStatus {
    ACTIVE,     // public + visible
    FLAGGED,    // reported by users
    HIDDEN,     // hidden by moderators/trustees
    DELETED,    // soft deleted
}
