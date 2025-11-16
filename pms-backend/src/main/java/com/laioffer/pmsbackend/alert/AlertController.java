package com.laioffer.pmsbackend.alert;

import com.laioffer.pmsbackend.model.AlertDto;
import com.laioffer.pmsbackend.security.annotations.TrusteeOnly;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
        return alertService.getAllAlerts();
    }

    @GetMapping("/newest")
    public AlertDto getNewestAlert() {
        return alertService.getNewestAlert();
    }

    @GetMapping("/{id}")
    public AlertDto getAlertById(@PathVariable Long id) {
        return alertService.getAlertById(id);
    }

    @TrusteeOnly
    @PostMapping(consumes = {"multipart/form-data"})
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<AlertDto> createAlert(
            @RequestParam String title,
            @RequestParam String content,
            @RequestParam(required = false) List<MultipartFile> images,
            @RequestParam Long createdBy
    ) {
        AlertDto dto = alertService.createAlert(title, content, images, createdBy);
        return ResponseEntity.status(HttpStatus.CREATED).body(dto);
    }

    @TrusteeOnly
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteAlert(@PathVariable Long id) {
        alertService.deleteAlert(id);
    }
}
