package com.laioffer.pmsbackend.newsletter;

import com.laioffer.pmsbackend.common.ResourceNotFoundException;
import com.laioffer.pmsbackend.model.NewsletterDto;
import com.laioffer.pmsbackend.model.NewsletterEntity;
import com.laioffer.pmsbackend.repository.NewsletterRepository;
import com.laioffer.pmsbackend.storage.ImageStorageService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.time.Instant;
import java.util.List;

@Service
public class NewsletterService {

    private final NewsletterRepository newsletterRepository;
    private final ImageStorageService imageStorageService;

    public NewsletterService(
            NewsletterRepository newsletterRepository,
            ImageStorageService imageStorageService
    ) {
        this.newsletterRepository = newsletterRepository;
        this.imageStorageService = imageStorageService;
    }

    public List<NewsletterDto> getAllNewsletters() {
        return newsletterRepository.findAllByOrderByCreatedAtDesc()
                .stream()
                .map(NewsletterDto::new)
                .toList();
    }

    public NewsletterDto getNewestNewsletter() {
        return newsletterRepository.findFirstByOrderByCreatedAtDesc()
                .map(NewsletterDto::new)
                .orElseThrow(() ->
                        new ResourceNotFoundException("No newsletters found"));
    }

    public NewsletterDto getNewsletterById(Long id) {
        return newsletterRepository.findById(id)
                .map(NewsletterDto::new)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Newsletter not found: " + id));
    }

    @Transactional
    public NewsletterDto createNewsletter(
            String title,
            String content,
            List<MultipartFile> images,
            Long createdBy
    ) {
        List<String> uploadedUrls = (images == null)
                ? List.of()
                : images.stream()
                .filter(image -> !image.isEmpty())
                .map(imageStorageService::upload)
                .toList();

        NewsletterEntity entity = new NewsletterEntity(
                null,
                title,
                content,
                uploadedUrls,
                createdBy,
                Instant.now()
        );

        return new NewsletterDto(newsletterRepository.save(entity));
    }

    public void deleteNewsletter(Long id) {
        newsletterRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Newsletter not found: " + id));

        newsletterRepository.deleteById(id);
    }
}
