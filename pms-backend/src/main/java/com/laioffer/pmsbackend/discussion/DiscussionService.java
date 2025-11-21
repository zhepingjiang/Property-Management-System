package com.laioffer.pmsbackend.discussion;

import com.laioffer.pmsbackend.common.DeleteResourceNotAllowedException;
import com.laioffer.pmsbackend.common.ResourceNotFoundException;
import com.laioffer.pmsbackend.model.PostDto;
import com.laioffer.pmsbackend.model.PostEntity;
import com.laioffer.pmsbackend.model.ReplyDto;
import com.laioffer.pmsbackend.model.ReplyEntity;
import com.laioffer.pmsbackend.model.enums.PostStatus;
import com.laioffer.pmsbackend.repository.PostRepository;
import com.laioffer.pmsbackend.repository.ReplyRepository;
import com.laioffer.pmsbackend.storage.ImageStorageService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.time.Instant;
import java.util.List;

@Service
public class DiscussionService {

    private final ImageStorageService imageStorageService;

    private final PostRepository postRepository;

    private final ReplyRepository replyRepository;

    public DiscussionService(ImageStorageService imageStorageService, PostRepository postRepository, ReplyRepository replyRepository) {
        this.imageStorageService = imageStorageService;
        this.postRepository = postRepository;
        this.replyRepository = replyRepository;
    }

    public List<PostDto> getAllPosts() {
        return postRepository.findAllByOrderByCreatedAtDesc()
                .stream()
                .map(PostDto::new)
                .toList();
    }

    public PostDto getPostById(Long id) {
        return postRepository.findById(id)
                .map(PostDto::new)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Post not found: " + id));
    }

    public PostDto getNewestPost() {
        return postRepository.findFirstByOrderByCreatedAtDesc()
                .map(PostDto::new)
                .orElseThrow(() ->
                        new ResourceNotFoundException("No posts found"));
    }

    public List<PostDto> getPostsByAuthorId(Long authorId) {
        return postRepository.findAllByAuthorIdOrderByCreatedAtDesc(authorId)
                .stream()
                .map(PostDto::new)
                .toList();
    }

    @Transactional
    public void createPost(
            Long authorId,
            String content,
            List<MultipartFile> images
    ) {
        List<String> uploadedUrls = images == null
                ? List.of()
                : images.parallelStream()
                    .filter(image -> !image.isEmpty())
                    .map(imageStorageService::upload)
                    .toList();

        PostEntity post = new PostEntity(
                null,
                authorId,
                content,
                PostStatus.ACTIVE,
                uploadedUrls,
                Instant.now()
        );

        postRepository.save(post);
    }

    /**
     * Soft-update the status of a post.
     * Example: ACTIVE → HIDDEN, or ACTIVE -> DELETED
     */
    @Transactional
    public void updatePostStatus(Long id, PostStatus newStatus) {
        postRepository.updateStatus(id, newStatus);
    }

    /**
     * Hard delete — Trustees or the original author can do this.
     */
    public void deletePost(Long id) {
        postRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Post not found: " + id));

        postRepository.deleteById(id);
    }

    public List<ReplyDto> getRepliesForPost(Long postId) {
        return replyRepository
                .findAllByPostIdOrderByCreatedAtAsc(postId)
                .stream()
                .map(ReplyDto::new)
                .toList();
    }

    @Transactional
    public ReplyDto createReplyForPost(Long postId, Long authorId, String content) {

        // Ensure post exists
        PostEntity post = postRepository.findById(postId)
                .orElseThrow(() -> new ResourceNotFoundException("Post not found: " + postId));

        ReplyEntity reply = new ReplyEntity(
                null,
                authorId,
                content,
                postId,
                null
        );

        ReplyEntity saved = replyRepository.save(reply);
        return new ReplyDto(saved);
    }

    @Transactional
    public void deleteReply(Long replyId, Long currentUserId, boolean isTrustee) {

        ReplyEntity reply = replyRepository.findById(replyId)
                .orElseThrow(() -> new ResourceNotFoundException("Reply not found: " + replyId));

        boolean isAuthor = reply.getAuthorId().equals(currentUserId);

        if (!isAuthor && !isTrustee) {
            throw new DeleteResourceNotAllowedException("You do not have permission to delete this reply.");
        }

        replyRepository.delete(reply);
    }
}
