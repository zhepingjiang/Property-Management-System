package com.laioffer.pmsbackend.announcement;

import com.laioffer.pmsbackend.model.AnnouncementEntity;
import com.laioffer.pmsbackend.model.AnnouncementRequest;
import com.laioffer.pmsbackend.model.UserEntity;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;

@RestController
@RequestMapping("/announcements")
public class AnnouncementController {

    private final AnnouncementService announcementService;

    public AnnouncementController(AnnouncementService announcementService) {
        this.announcementService = announcementService;
    }

    @GetMapping("/{id}")
    public AnnouncementEntity getAnnouncement(@PathVariable long id) {
        return announcementService.findAnnouncement(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void createAnnouncement(@RequestBody AnnouncementRequest body, @AuthenticationPrincipal UserEntity user) {
        Instant currentTime = Instant.now();
        Long createdBy = user.getId();
        announcementService.createAnnouncement(null, body.getTitle(), body.getContent(),createdBy, currentTime);
    }



    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteAnnouncement(@PathVariable long id){
        announcementService.deleteAnnouncement(id);
    }
}
