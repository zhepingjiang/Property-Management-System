package com.laioffer.pmsbackend.maintenance;

import com.laioffer.pmsbackend.common.DeleteResourceNotAllowedException;
import com.laioffer.pmsbackend.common.ResourceNotFoundException;
import com.laioffer.pmsbackend.model.*;
import com.laioffer.pmsbackend.model.enums.MaintenancePriority;
import com.laioffer.pmsbackend.model.enums.MaintenanceStatus;
import com.laioffer.pmsbackend.repository.MaintenanceRequestRepository;
import com.laioffer.pmsbackend.repository.ReplyRepository;
import com.laioffer.pmsbackend.storage.ImageStorageService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
public class MaintenanceRequestService {

    private final MaintenanceRequestRepository maintenanceRepository;
    private final ReplyRepository replyRepository;
    private final ImageStorageService imageStorageService;

    public MaintenanceRequestService(
            MaintenanceRequestRepository maintenanceRepository,
            ReplyRepository replyRepository,
            ImageStorageService imageStorageService
    ) {
        this.maintenanceRepository = maintenanceRepository;
        this.replyRepository = replyRepository;
        this.imageStorageService = imageStorageService;
    }

    public List<MaintenanceRequestDto> getRequestsByAuthor(Long authorId) {
        return maintenanceRepository.findAllByAuthorIdOrderByCreatedAtDesc(authorId)
                .stream()
                .map(MaintenanceRequestDto::new)
                .toList();
    }

    public MaintenanceRequestDto getRequestById(Long id) {
        return maintenanceRepository.findById(id)
                .map(MaintenanceRequestDto::new)
                .orElseThrow(() -> new ResourceNotFoundException("Maintenance request not found: " + id));
    }

    /* ================================
       CREATE REQUEST
    ================================= */
    @Transactional
    public void createRequest(
            Long authorId,
            String facility,
            String issueType,
            String description,
            MaintenancePriority priority,
            Long assignedTo,
            List<MultipartFile> images
    ) {
        List<String> uploaded = images == null
                ? List.of()
                : images.stream()
                .filter(img -> !img.isEmpty())
                .map(imageStorageService::upload)
                .toList();

        MaintenanceRequestEntity req = new MaintenanceRequestEntity(
                null,
                authorId,
                facility,
                issueType,
                description,
                MaintenanceStatus.SUBMITTED,
                priority,
                assignedTo,
                uploaded
        );

        maintenanceRepository.save(req);
    }

    /* ================================
       UPDATE STATUS / PRIORITY / ASSIGNEE
    ================================= */
    @Transactional
    public void updateStatus(Long id, MaintenanceStatus status) {
        MaintenanceRequestEntity req = maintenanceRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Maintenance request not found: " + id));

        req.setStatus(status);
    }

    @Transactional
    public void updatePriority(Long id, MaintenancePriority priority) {
        MaintenanceRequestEntity req = maintenanceRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Maintenance request not found: " + id));

        req.setPriority(priority);
    }

    @Transactional
    public void updateAssignedTo(Long id, Long assignedTo) {
        MaintenanceRequestEntity req = maintenanceRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Maintenance request not found: " + id));

        req.setAssignedTo(assignedTo);
    }

    /* ================================
       DELETE REQUEST (trustee only)
    ================================= */
    public void deleteRequest(Long id) {
        MaintenanceRequestEntity req = maintenanceRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Maintenance request not found: " + id));

        maintenanceRepository.delete(req);
    }

    /* ================================
       REPLIES
    ================================= */
    public List<ReplyDto> getRepliesForRequest(Long requestId) {
        return replyRepository.findAllByMaintenanceRequestIdOrderByCreatedAtAsc(requestId)
                .stream()
                .map(ReplyDto::new)
                .toList();
    }

    @Transactional
    public ReplyDto createReply(Long requestId, Long authorId, String content) {
        maintenanceRepository.findById(requestId)
                .orElseThrow(() -> new ResourceNotFoundException("Maintenance request not found: " + requestId));

        ReplyEntity reply = new ReplyEntity(
                null,
                authorId,
                content,
                null,   // postId null
                requestId       // maintenanceRequestId
        );

        ReplyEntity saved = replyRepository.save(reply);
        return new ReplyDto(saved);
    }

    @Transactional
    public void deleteReply(Long replyId, Long currentUserId, boolean isTrustee) {
        ReplyEntity reply = replyRepository.findById(replyId)
                .orElseThrow(() -> new ResourceNotFoundException("Reply not found: " + replyId));

        boolean isAuthor = reply.getAuthorId().equals(currentUserId);

        if (!isAuthor && !isTrustee) {
            throw new DeleteResourceNotAllowedException("You do not have permission to delete this reply.");
        }

        replyRepository.delete(reply);
    }
}

