package com.laioffer.pmsbackend.discussion;

import com.laioffer.pmsbackend.model.PostEntity;
import com.laioffer.pmsbackend.model.enums.PostStatus;
import com.laioffer.pmsbackend.repository.DiscussionRepository;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;

@Service
public class DiscussionService {

    private final DiscussionRepository discussionRepository;

    public DiscussionService(DiscussionRepository discussionRepository) {
        this.discussionRepository = discussionRepository;
    }

    public PostEntity findDiscussionByID(long id) {
        return discussionRepository.findById(id).orElse(null);
    }

    public List<PostEntity> findDiscussionByUserID(long id) {
        return discussionRepository.findById(id).stream().toList();
    }

    public void createDiscussion(Long id, Long authorId, String content, PostStatus status, Instant createdAt) {
        discussionRepository.save(new PostEntity(null, authorId, content, status, createdAt));
    }

    public void deleteDiscussion(long id){
        discussionRepository.deleteById(id);
    }

}

