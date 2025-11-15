package com.laioffer.pmsbackend.event;

import com.laioffer.pmsbackend.common.ResourceNotFoundException;
import com.laioffer.pmsbackend.model.EventDto;
import com.laioffer.pmsbackend.model.EventEntity;
import com.laioffer.pmsbackend.repository.EventRepository;
import com.laioffer.pmsbackend.storage.ImageStorageService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.time.Instant;
import java.util.List;

@Service
public class EventService {

    private final EventRepository eventRepository;
    private final ImageStorageService imageStorageService;

    public EventService(EventRepository eventRepository,
                        ImageStorageService imageStorageService) {
        this.eventRepository = eventRepository;
        this.imageStorageService = imageStorageService;
    }

    public List<EventDto> getAllEvents() {
        return eventRepository.findAllByOrderByCreatedAtDesc()
                .stream()
                .map(EventDto::new)
                .toList();
    }

    public EventDto getNewestEvent() {
        return eventRepository.findFirstByOrderByCreatedAtDesc()
                .map(EventDto::new)
                .orElseThrow(() ->
                        new ResourceNotFoundException("No events found"));
    }

    public EventDto getEventById(Long id) {
        return eventRepository.findById(id)
                .map(EventDto::new)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Event not found: " + id));
    }

    @Transactional
    public EventDto createEvent(
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

        EventEntity entity = new EventEntity(
                null,
                title,
                content,
                uploadedUrls,
                createdBy,
                Instant.now()
        );

        return new EventDto(eventRepository.save(entity));
    }

    public void deleteEvent(Long id) {
        eventRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Event not found: " + id));

        eventRepository.deleteById(id);
    }
}
