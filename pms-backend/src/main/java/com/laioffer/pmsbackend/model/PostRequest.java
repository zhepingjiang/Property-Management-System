package com.laioffer.pmsbackend.model;

import java.time.Instant;

public class PostRequest {
    private String content;
    private Long authorId;

    public String getContent() {
        return content;
    }

    public Long getAuthorId() {
        return authorId;
    }
}

