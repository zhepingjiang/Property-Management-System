package com.laioffer.pmsbackend.alert;

import com.laioffer.pmsbackend.common.ResourceNotFoundException;
import com.laioffer.pmsbackend.model.AlertDto;
import com.laioffer.pmsbackend.model.AlertEntity;
import com.laioffer.pmsbackend.repository.AlertRepository;
import com.laioffer.pmsbackend.storage.ImageStorageService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.time.Instant;
import java.util.List;

@Service
public class AlertService {

    private final AlertRepository alertRepository;
    private final ImageStorageService imageStorageService;

    public AlertService(AlertRepository alertRepository,
                        ImageStorageService imageStorageService) {
        this.alertRepository = alertRepository;
        this.imageStorageService = imageStorageService;
    }

    public List<AlertDto> getAllAlerts() {
        return alertRepository.findAllByOrderByCreatedAtDesc()
                .stream()
                .map(AlertDto::new)
                .toList();
    }

    public AlertDto getAlertById(Long id) {
        return alertRepository.findById(id)
                .map(AlertDto::new)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Alert not found: " + id));
    }

    public AlertDto getNewestAlert() {
        return alertRepository.findFirstByOrderByCreatedAtDesc()
                .map(AlertDto::new)
                .orElseThrow(() ->
                        new ResourceNotFoundException("No alerts found"));
    }

    @Transactional
    public AlertDto createAlert(
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

        AlertEntity entity = new AlertEntity(
                null,
                title,
                content,
                uploadedUrls,
                createdBy,
                Instant.now()
        );

        return new AlertDto(alertRepository.save(entity));
    }

    public void deleteAlert(Long id) {
        alertRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Alert not found: " + id));

        alertRepository.deleteById(id);
    }
}
