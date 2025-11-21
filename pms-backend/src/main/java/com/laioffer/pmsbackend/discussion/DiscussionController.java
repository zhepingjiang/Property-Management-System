package com.laioffer.pmsbackend.discussion;
import com.laioffer.pmsbackend.model.PostDto;
import com.laioffer.pmsbackend.model.ReplyDto;
import com.laioffer.pmsbackend.model.enums.PostStatus;
import com.laioffer.pmsbackend.security.CustomUserDetails;
import com.laioffer.pmsbackend.security.annotations.TrusteeOnly;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

import static com.laioffer.pmsbackend.model.enums.UserRole.ROLE_TRUSTEE;

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
            @AuthenticationPrincipal CustomUserDetails user,
            @RequestParam String content,
            @RequestParam(required = false) List<MultipartFile> images
    ) {
        discussionService.createPost(user.getId(), content, images);
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

    // ===============================
    // REPLIES
    // ===============================
    // Get replies with ascending create date order (oldest first)
    @GetMapping("/{id}/replies")
    public List<ReplyDto> getReplies(@PathVariable Long id) {
        return discussionService.getRepliesForPost(id);
    }

    @PostMapping("/{id}/replies")
    @ResponseStatus(HttpStatus.CREATED)
    public ReplyDto createReply(
            @PathVariable Long id,
            @AuthenticationPrincipal CustomUserDetails user,
            @RequestParam String content
    ) {
        return discussionService.createReplyForPost(id, user.getId(), content);
    }

    @DeleteMapping("/replies/{replyId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteReply(
            @PathVariable Long replyId,
            @AuthenticationPrincipal CustomUserDetails user,
            Authentication authentication
    ) {
        boolean isTrustee = authentication.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals(ROLE_TRUSTEE.name()));

        discussionService.deleteReply(replyId, user.getId(), isTrustee);
    }
}
