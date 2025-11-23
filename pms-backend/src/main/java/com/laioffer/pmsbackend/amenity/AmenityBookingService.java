package com.laioffer.pmsbackend.amenity;

import com.laioffer.pmsbackend.common.DeleteResourceNotAllowedException;
import com.laioffer.pmsbackend.common.ResourceNotFoundException;
import com.laioffer.pmsbackend.model.AmenityBookingDto;
import com.laioffer.pmsbackend.model.AmenityBookingEntity;
import com.laioffer.pmsbackend.model.AmenityUnitEntity;
import com.laioffer.pmsbackend.model.enums.AmenityBookingStatus;
import com.laioffer.pmsbackend.repository.AmenityBookingRepository;
import com.laioffer.pmsbackend.repository.AmenityUnitRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.List;

@Service
public class AmenityBookingService {

    private final AmenityBookingRepository bookingRepository;
    private final AmenityUnitRepository unitRepository;

    public AmenityBookingService(AmenityBookingRepository bookingRepository,
                                 AmenityUnitRepository unitRepository) {
        this.bookingRepository = bookingRepository;
        this.unitRepository = unitRepository;
    }

    // ========== READ ==========

    public List<AmenityBookingDto> getBookingsForUnit(Long unitId) {
        return bookingRepository.findAllByUnitIdOrderByStartTimeAsc(unitId)
                .stream()
                .map(AmenityBookingDto::new)
                .toList();
    }

    public List<AmenityBookingDto> getBookingsForUser(Long userId) {
        return bookingRepository.findAllByUserIdOrderByStartTimeDesc(userId)
                .stream()
                .map(AmenityBookingDto::new)
                .toList();
    }

    public List<AmenityBookingDto> getHistoryBookingsForUser(Long userId) {
        Instant now = Instant.now();
        return bookingRepository
                .findAllByUserIdAndStartTimeBeforeOrderByStartTimeDesc(userId, now)
                .stream()
                .map(AmenityBookingDto::new)
                .toList();
    }

    public List<AmenityBookingDto> getFutureBookingsForUser(Long userId) {
        Instant now = Instant.now();
        return bookingRepository
                .findAllByUserIdAndStartTimeAfterOrderByStartTimeAsc(userId, now)
                .stream()
                .map(AmenityBookingDto::new)
                .toList();
    }

    public List<AmenityBookingDto> getAllBookings() {
        return bookingRepository.findAll()
                .stream()
                .map(AmenityBookingDto::new)
                .toList();
    }

    // ========== CREATE Booking ==========
    @Transactional
    public AmenityBookingDto createBooking(
            Long userId,
            Long unitId,
            Integer guestCount,
            Instant startTime,
            Instant endTime
    ) {
        if (startTime == null || endTime == null || !startTime.isBefore(endTime)) {
            throw new IllegalArgumentException("Invalid booking time range.");
        }
        if (guestCount == null || guestCount <= 0) {
            throw new IllegalArgumentException("Guest count must be positive.");
        }

        AmenityUnitEntity unit = unitRepository.findById(unitId)
                .orElseThrow(() -> new ResourceNotFoundException("Amenity unit not found: " + unitId));

        if (Boolean.FALSE.equals(unit.getIsActive())) {
            throw new IllegalStateException("Amenity unit is not active.");
        }

        // Overlapping bookings for capacity check
        List<AmenityBookingEntity> overlapping =
                bookingRepository.findOverlappingBookings(unitId, startTime, endTime);

        int existingGuests = overlapping.stream()
                .map(AmenityBookingEntity::getGuestCount)
                .mapToInt(Integer::intValue)
                .sum();

        int totalGuests = existingGuests + guestCount;
        Integer capacity = unit.getCapacity();

        if (capacity != null && totalGuests > capacity) {
            throw new IllegalStateException(
                    "Booking exceeds capacity. Current overlapping guests: "
                            + existingGuests + ", requested: " + guestCount
                            + ", capacity: " + capacity
            );
        }

        AmenityBookingEntity booking = new AmenityBookingEntity(
                null,
                unitId,
                userId,
                guestCount,
                startTime,
                endTime,
                AmenityBookingStatus.ACTIVE,
                null
        );

        AmenityBookingEntity saved = bookingRepository.save(booking);
        return new AmenityBookingDto(saved);
    }

    // ========== DELETE Booking ==========

    @Transactional
    public void deleteBooking(Long bookingId, Long currentUserId, boolean isTrustee) {

        AmenityBookingEntity booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found: " + bookingId));

        if (isTrustee) {
            bookingRepository.delete(booking);
            return;
        }

        // Normal user: can only delete own *future* bookings
        if (!booking.getUserId().equals(currentUserId)) {
            throw new DeleteResourceNotAllowedException("You can only cancel your own bookings.");
        }

        Instant now = Instant.now();
        if (!booking.getStartTime().isAfter(now)) {
            throw new DeleteResourceNotAllowedException("You can only cancel future bookings.");
        }

        bookingRepository.delete(booking);
    }
}
