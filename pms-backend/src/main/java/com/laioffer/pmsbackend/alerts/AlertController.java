package com.laioffer.pmsbackend.alerts;

import com.laioffer.pmsbackend.model.AlertDto;
import com.laioffer.pmsbackend.model.AlertEntity;
import com.laioffer.pmsbackend.security.annotations.TrusteeOnly;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/alerts")
public class AlertController {

    private final AlertService alertService;

    public AlertController(AlertService alertService) {
        this.alertService = alertService;
    }

    @GetMapping
    public List<AlertDto> getAllAlerts() {
        return alertService.getAllAlerts()
                .stream()
                .map(AlertDto::new)
                .toList();
    }

    @GetMapping("/newest")
    public AlertDto getNewestAlert() {
        AlertEntity entity = alertService.getNewestAlert();
        return new AlertDto(entity);
    }

    @TrusteeOnly
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public AlertDto createAlert(
            @RequestParam("title") String title,
            @RequestParam("content") String content,
            @RequestParam(value = "images", required = false) List<MultipartFile> images,
            @RequestParam("createdBy") Long createdBy
    ) {
        if (images == null) {
            images = List.of();
        }

        AlertEntity created = alertService.createAlert(
                title,
                content,
                images,
                createdBy
        );

        return new AlertDto(created);
    }

    @TrusteeOnly
    @DeleteMapping("/{id}")
    public void deleteAlert(@PathVariable Long id) {
        alertService.deleteAlert(id);
    }
}
