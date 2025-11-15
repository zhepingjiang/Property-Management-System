package com.laioffer.pmsbackend.newsletter;

import com.laioffer.pmsbackend.model.NewsletterDto;
import com.laioffer.pmsbackend.security.annotations.TrusteeOnly;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/newsletters")
public class NewsletterController {

    private final NewsletterService newsletterService;

    public NewsletterController(NewsletterService newsletterService) {
        this.newsletterService = newsletterService;
    }

    @GetMapping
    public List<NewsletterDto> getAllNewsletters() {
        return newsletterService.getAllNewsletters();
    }

    @GetMapping("/newest")
    public NewsletterDto getNewestNewsletter() {
        return newsletterService.getNewestNewsletter();
    }

    @GetMapping("/{id}")
    public NewsletterDto getNewsletterById(@PathVariable Long id) {
        return newsletterService.getNewsletterById(id);
    }

    @TrusteeOnly
    @PostMapping(consumes = {"multipart/form-data"})
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<NewsletterDto> createNewsletter(
            @RequestParam String title,
            @RequestParam String content,
            @RequestParam(required = false) List<MultipartFile> images,
            @RequestParam Long createdBy
    ) {
        NewsletterDto dto =
                newsletterService.createNewsletter(title, content, images, createdBy);

        return ResponseEntity.status(HttpStatus.CREATED).body(dto);
    }

    @TrusteeOnly
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteNewsletter(@PathVariable Long id) {
        newsletterService.deleteNewsletter(id);
    }
}
