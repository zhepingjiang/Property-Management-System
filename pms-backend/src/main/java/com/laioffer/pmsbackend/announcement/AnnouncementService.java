package com.laioffer.pmsbackend.announcement;

import com.laioffer.pmsbackend.common.ResourceNotFoundException;
import com.laioffer.pmsbackend.model.AnnouncementDto;
import com.laioffer.pmsbackend.model.AnnouncementEntity;
import com.laioffer.pmsbackend.repository.AnnouncementRepository;
import com.laioffer.pmsbackend.storage.ImageStorageService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
public class AnnouncementService {

    private final ImageStorageService imageStorageService;
    private final AnnouncementRepository announcementRepository;

    public AnnouncementService(
            ImageStorageService imageStorageService,
            AnnouncementRepository announcementRepository
    ) {
        this.imageStorageService = imageStorageService;
        this.announcementRepository = announcementRepository;
    }

    public List<AnnouncementDto> getAllAnnouncements() {
        return announcementRepository.findAllByOrderByCreatedAtDesc()
                .stream()
                .map(AnnouncementDto::new)
                .toList();
    }

    public AnnouncementDto getNewestAnnouncement() {
        return announcementRepository.findFirstByOrderByCreatedAtDesc()
                .map(AnnouncementDto::new)
                .orElseThrow(() ->
                        new ResourceNotFoundException("No announcements found"));
    }

    /**
     * Note: Only Trustees should be allowed to create announcements.
     */
    @Transactional
    public void createAnnouncement(
            String title,
            String content,
            List<MultipartFile> images,
            Long createdBy
    ) {
        List<String> uploadedUrls = images == null
                ? List.of()
                : images.parallelStream()
                .filter(image -> !image.isEmpty())
                .map(imageStorageService::upload)
                .toList();

        AnnouncementEntity announcement = new AnnouncementEntity(
                null,
                title,
                content,
                createdBy,
                uploadedUrls,
                null
        );

        announcementRepository.save(announcement);
    }

    /**
     * Note: Only Trustees should be allowed to delete announcements.
     */
    public void deleteAnnouncement(Long id) {
        announcementRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Announcement not found: " + id));

        announcementRepository.deleteById(id);
    }
}
