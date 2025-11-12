package com.laioffer.pmsbackend.announcement;

import com.laioffer.pmsbackend.model.AnnouncementEntity;
import com.laioffer.pmsbackend.repository.AnnouncementRepository;
import com.laioffer.pmsbackend.repository.DiscussionRepository;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;

@Service
public class AnnouncementService {

    private final AnnouncementRepository announcementRepository;

    public AnnouncementService(AnnouncementRepository announcementRepository) {
        this.announcementRepository = announcementRepository;
    }

    public AnnouncementEntity findAnnouncement(long id) {
        return announcementRepository.findById(id)
                .orElse(null);
    }

    public void createAnnouncement(Long id, String title, String content, Long createdBy, Instant createdAt) {
        announcementRepository.save(new AnnouncementEntity(null, title, content, createdBy, createdAt));
    }

    public void deleteAnnouncement(long id) {
        announcementRepository.deleteById(id);
    }


}
