package com.laioffer.pmsbackend.alert;

import com.laioffer.pmsbackend.common.ResourceNotFoundException;
import com.laioffer.pmsbackend.model.AlertEntity;
import com.laioffer.pmsbackend.repository.AlertRepository;
import com.laioffer.pmsbackend.storage.ImageStorageService;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.time.Instant;
import java.util.List;

@Service
public class AlertService {
    private final ImageStorageService imageStorageService;
    private final AlertRepository alertRepository;

    public AlertService(ImageStorageService imageStorageService, AlertRepository alertRepository) {
        this.imageStorageService = imageStorageService;
        this.alertRepository = alertRepository;
    }

    public List<AlertEntity> getAllAlerts() {
        return alertRepository.findAll()
                .stream()
                .toList();
    }

    public AlertEntity getNewestAlert() {
        return alertRepository.findFirstByOrderByCreatedAtDesc()
                .orElseThrow(() -> new ResourceNotFoundException("No alerts found"));
    }

    public AlertEntity createAlert(
            String title,
            String content,
            List<MultipartFile> images,
            Long createdBy
    ) {
        List<String> uploadedUrls = images.parallelStream()
                .filter(image -> !image.isEmpty())
                .map(imageStorageService::upload)
                .toList();

        return alertRepository.save(new AlertEntity(
                null,
                title,
                content,
                uploadedUrls,
                createdBy,
                Instant.now()
        ));
    }

    /**
     * Note: This method can only be called by Trustees
     * Residents will not have permission
     * @param id id of the alert
     */
    public void deleteAlert(Long id) {
        AlertEntity alertEntity = alertRepository.getReferenceById(id);
        alertRepository.deleteById(id);
    }
}
