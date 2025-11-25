package com.laioffer.pmsbackend.repository;

import com.laioffer.pmsbackend.model.AmenityBookingEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.Instant;
import java.time.LocalDateTime;
import java.util.List;

public interface AmenityBookingRepository extends JpaRepository<AmenityBookingEntity, Long> {

    List<AmenityBookingEntity> findAllByUnitIdOrderByStartTimeAsc(Long unitId);

    List<AmenityBookingEntity> findAllByUserIdOrderByStartTimeDesc(Long userId);

    List<AmenityBookingEntity> findAllByUserIdAndStartTimeBeforeOrderByStartTimeDesc(
            Long userId,
            Instant cutoff
    );

    List<AmenityBookingEntity> findAllByUserIdAndStartTimeAfterOrderByStartTimeAsc(
            Long userId,
            Instant cutoff
    );

    @Query("""
            select b
            from AmenityBookingEntity b
            where b.unitId = :unitId
              and b.startTime < :endTime
              and b.endTime > :startTime
            """)
    List<AmenityBookingEntity> findOverlappingBookings(Long unitId, Instant startTime, Instant endTime);

    List<AmenityBookingEntity> findByUnitIdAndStartTimeBetween(
            Long unitId,
            Instant startOfDay,
            Instant endOfDay
    );
}
