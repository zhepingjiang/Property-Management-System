package com.laioffer.pmsbackend.discussion;

import com.laioffer.pmsbackend.announcement.AnnouncementController;
import com.laioffer.pmsbackend.model.PostEntity;
import com.laioffer.pmsbackend.model.PostRequest;
import com.laioffer.pmsbackend.model.UserEntity;
import com.laioffer.pmsbackend.model.enums.PostStatus;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.List;

@RestController
@RequestMapping("/announcements")
public class DiscussionController {

    private final DiscussionService discussionService;

    public DiscussionController(DiscussionService discussionService) {
        this.discussionService = discussionService;
    }

    @GetMapping("/{id}")
    public List<PostEntity> getAnnouncements(@PathVariable long id) {
        return discussionService.findDiscussionByUserID(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void createDiscussion(@RequestBody PostRequest body, @AuthenticationPrincipal UserEntity user) {
        Instant currentTime = Instant.now();
        PostStatus status = com.laioffer.pmsbackend.model.enums.PostStatus.VISIBLE;
        discussionService.createDiscussion(null, body.getAuthorId(), body.getContent(),status,currentTime);
    }


    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteDiscussion(@PathVariable long id) {discussionService.deleteDiscussion(id);}


}
