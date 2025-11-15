package com.laioffer.pmsbackend.discussion;
import com.laioffer.pmsbackend.model.PostDto;
import com.laioffer.pmsbackend.model.enums.PostStatus;
import com.laioffer.pmsbackend.security.annotations.TrusteeOnly;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/posts")
public class DiscussionController {

    private final DiscussionService discussionService;

    public DiscussionController(DiscussionService discussionService) {
        this.discussionService = discussionService;
    }

    @GetMapping
    public List<PostDto> getAllPosts() {
        return discussionService.getAllPosts();
    }

    @GetMapping("/{id}")
    public PostDto getPostById(@PathVariable Long id) {
        return discussionService.getPostById(id);
    }

    @GetMapping("/newest")
    public PostDto getNewestPost() {
        return discussionService.getNewestPost();
    }

    @GetMapping("/author/{authorId}")
    public List<PostDto> getPostsByAuthor(@PathVariable Long authorId) {
        return discussionService.getPostsByAuthorId(authorId);
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public void createPost(
            @RequestParam Long authorId,
            @RequestParam String content,
            @RequestParam(required = false) List<MultipartFile> images
    ) {
        discussionService.createPost(authorId, content, images);
    }

    @TrusteeOnly
    @PatchMapping("/{id}/status")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void updatePostStatus(
            @PathVariable Long id,
            @RequestParam PostStatus status
    ) {
        discussionService.updatePostStatus(id, status);
    }

    @TrusteeOnly
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deletePost(@PathVariable Long id) {
        discussionService.deletePost(id);
    }
}
