package com.laioffer.pmsbackend.maintenance;

import com.laioffer.pmsbackend.model.MaintenanceRequestDto;
import com.laioffer.pmsbackend.model.ReplyDto;
import com.laioffer.pmsbackend.model.enums.MaintenancePriority;
import com.laioffer.pmsbackend.model.enums.MaintenanceStatus;
import com.laioffer.pmsbackend.security.annotations.TrusteeOnly;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

import static com.laioffer.pmsbackend.model.enums.UserRole.ROLE_TRUSTEE;

@RestController
@RequestMapping("/api/maintenance")
public class MaintenanceRequestController {

    private final MaintenanceRequestService service;

    public MaintenanceRequestController(MaintenanceRequestService service) {
        this.service = service;
    }

    /* ==========================
       READ
    ========================== */
    @GetMapping
    public List<MaintenanceRequestDto> getAllRequests(@AuthenticationPrincipal String userId) {
        return service.getRequestsByAuthor(Long.valueOf(userId));
    }

    @GetMapping("/{id}")
    public MaintenanceRequestDto getById(@PathVariable Long id) {
        return service.getRequestById(id);
    }

    /* ==========================
       CREATE
    ========================== */
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public void createRequest(
            @AuthenticationPrincipal String authorId,
            @RequestParam String facility,
            @RequestParam String issueType,
            @RequestParam String description,
            @RequestParam MaintenancePriority priority,
            @RequestParam Long assignedTo,
            @RequestParam(required = false) List<MultipartFile> images
    ) {
        service.createRequest(Long.valueOf(authorId), facility, issueType, description, priority, assignedTo, images);
    }

    /* ==========================
       UPDATE
    ========================== */

    @TrusteeOnly
    @PatchMapping("/{id}/status")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void updateStatus(
            @PathVariable Long id,
            @RequestParam MaintenanceStatus status
    ) {
        service.updateStatus(id, status);
    }

    @PatchMapping("/{id}/priority")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void updatePriority(
            @PathVariable Long id,
            @RequestParam MaintenancePriority priority
    ) {
        service.updatePriority(id, priority);
    }

    @PatchMapping("/{id}/assign")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void updateAssignedTo(
            @PathVariable Long id,
            @RequestParam Long assignedTo
    ) {
        service.updateAssignedTo(id, assignedTo);
    }

    /* ==========================
       DELETE
    ========================== */
    @TrusteeOnly
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteRequest(@PathVariable Long id) {
        service.deleteRequest(id);
    }

    /* ==========================
       REPLIES
    ========================== */
    @GetMapping("/{id}/replies")
    public List<ReplyDto> getReplies(@PathVariable Long id) {
        return service.getRepliesForRequest(id);
    }

    @PostMapping("/{id}/replies")
    @ResponseStatus(HttpStatus.CREATED)
    public ReplyDto createReply(
            @PathVariable Long id,
            @AuthenticationPrincipal String authorId,
            @RequestParam String content
    ) {
        return service.createReply(id, Long.valueOf(authorId), content);
    }

    @DeleteMapping("/replies/{replyId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteReply(
            @PathVariable Long replyId,
            @AuthenticationPrincipal String userId,
            Authentication authentication
    ) {
        boolean isTrustee = authentication.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals(ROLE_TRUSTEE.name()));

        service.deleteReply(replyId, Long.valueOf(userId), isTrustee);
    }
}
