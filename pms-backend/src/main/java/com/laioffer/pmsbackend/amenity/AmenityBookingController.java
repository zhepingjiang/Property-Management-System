package com.laioffer.pmsbackend.amenity;

import com.laioffer.pmsbackend.model.AmenityBookingDto;
import com.laioffer.pmsbackend.security.CustomUserDetails;
import com.laioffer.pmsbackend.security.annotations.TrusteeOnly;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.List;

import static com.laioffer.pmsbackend.model.enums.UserRole.ROLE_TRUSTEE;

@RestController
@RequestMapping("/api/amenities/bookings")
public class AmenityBookingController {

    private final AmenityBookingService bookingService;

    public AmenityBookingController(AmenityBookingService bookingService) {
        this.bookingService = bookingService;
    }

    // c. get all bookings for a specific amenity unit
    @GetMapping("/unit/{unitId}")
    public List<AmenityBookingDto> getBookingsForUnit(@PathVariable Long unitId) {
        return bookingService.getBookingsForUnit(unitId);
    }

    // c. get all bookings given the user id (Trustee only)
    @TrusteeOnly
    @GetMapping("/user/{userId}")
    public List<AmenityBookingDto> getBookingsForUser(@PathVariable Long userId) {
        return bookingService.getBookingsForUser(userId);
    }

    // d. get all history bookings given the user id (current user)
    @GetMapping("/my/history")
    public List<AmenityBookingDto> getMyHistoryBookings(
            @AuthenticationPrincipal CustomUserDetails user
    ) {
        return bookingService.getHistoryBookingsForUser(user.getId());
    }

    // e. get all future bookings given the user id (current user)
    @GetMapping("/my/future")
    public List<AmenityBookingDto> getMyFutureBookings(
            @AuthenticationPrincipal CustomUserDetails user
    ) {
        return bookingService.getFutureBookingsForUser(user.getId());
    }

    // Optional: all my bookings (past + future)
    @GetMapping("/my")
    public List<AmenityBookingDto> getMyBookings(
            @AuthenticationPrincipal CustomUserDetails user
    ) {
        return bookingService.getBookingsForUser(user.getId());
    }

    // Trustee: view all bookings
    @TrusteeOnly
    @GetMapping
    public List<AmenityBookingDto> getAllBookings() {
        return bookingService.getAllBookings();
    }

    // f. Reserve/book an amenity unit
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public AmenityBookingDto createBooking(
            @AuthenticationPrincipal CustomUserDetails user,
            @RequestParam Long unitId,
            @RequestParam Integer guestCount,
            @RequestParam Instant startTime,
            @RequestParam Instant endTime
    ) {
        return bookingService.createBooking(
                user.getId(),
                unitId,
                guestCount,
                startTime,
                endTime
        );
    }

    // g. Delete a reservation / booking
    @DeleteMapping("/{bookingId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteBooking(
            @PathVariable Long bookingId,
            @AuthenticationPrincipal CustomUserDetails user,
            Authentication authentication
    ) {
        boolean isTrustee = authentication.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals(ROLE_TRUSTEE.name()));

        bookingService.deleteBooking(bookingId, user.getId(), isTrustee);
    }
}
