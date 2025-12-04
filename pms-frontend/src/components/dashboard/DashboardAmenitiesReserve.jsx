import React, { useEffect, useState } from "react";
import { Card, Typography, Button } from "antd";
import { useNavigate } from "react-router-dom";

import {
  getAllAmenityTypes,
  getUnitsByType,
  getMyFutureBookings,
} from "../amenity/utils";

import dayjs from "dayjs";
import "../../css/dashboard/DashboardAmenitiesReserve.css";

const { Title } = Typography;

export default function DashboardAmenitiesReserve() {
  const navigate = useNavigate();

  const [amenities, setAmenities] = useState([]);
  const [myBookings, setMyBookings] = useState([]);

  /* ===============================
        LOAD AMENITY TYPES
  =============================== */
  useEffect(() => {
    loadAmenities();
  }, []);

  const loadAmenities = async () => {
    try {
      const types = await getAllAmenityTypes();
      if (!types) return;

      const data = await Promise.all(
        types.map(async (t) => {
          const units = await getUnitsByType(t.id);
          return { ...t, units: units || [] };
        })
      );

      const flat = data.flatMap((type) =>
        type.units.map((unit) => ({
          id: unit.id,
          label: unit.label,
          typeName: type.name,
          image: type.imageUrls?.[0] || "/placeholder-amenity.jpg",
          fullType: type,
          fullUnit: unit,
        }))
      );

      setAmenities(flat);
    } catch (err) {
      console.error("Load amenities failed", err);
    }
  };

  const goToReserve = (unit, type) => {
    navigate(`/amenity/reserve/${unit.id}`, { state: { unit, type } });
  };

  /* ===============================
        LOAD MY BOOKINGS
  =============================== */
  useEffect(() => {
    console.log("Effect: loading future bookings");
    loadMyBookings();
  }, []);

  const loadMyBookings = async () => {
    try {
      const bookings = await getMyFutureBookings();
      if (!bookings) return;

      const mapped = bookings.map((b) => ({
        id: b.id,
        unitId: b.unit.id,
        unitLabel: b.unit.label,
        typeName: b.unit.type.name,
        image: b.unit.type.imageUrls?.[0] || "/placeholder-amenity.jpg",
        startTime: b.startTime,
        endTime: b.endTime,
        fullBooking: b,
      }));

      setMyBookings(mapped);
    } catch (err) {
      console.error("Load my bookings failed:", err);
    }
  };

  const goToBookingDetail = (booking) => {
    navigate(`/amenity/reserve/${booking.unitId}`, {
      state: {
        unit: booking.fullBooking.unit,
        type: booking.fullBooking.amenityType,
        booking,
      },
    });
  };

  /* ===============================
            RENDER
  =============================== */

  return (
    <>
      {/* ============================================
                AMENITIES RESERVE
      ============================================ */}
      <section className="amenities-section">
        <Title level={4} className="amenities-title">
          Amenities Reserve
        </Title>

        <div className="amenities-scroll-wrapper">
          <div className="amenities-scroll-inner">
            {amenities.map((a) => (
              <Card
                key={a.id}
                hoverable
                className="amenity-card-scrolling"
                onClick={() => goToReserve(a.fullUnit, a.fullType)}
              >
                <img
                  src={a.image}
                  alt={a.label}
                  className="amenity-scroll-img"
                />

                <div className="amenity-scroll-info">
                  <div className="amenity-scroll-title">{a.label}</div>
                  <div className="amenity-scroll-type">{a.typeName}</div>

                  <Button
                    className="amenity-scroll-btn"
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      goToReserve(a.fullUnit, a.fullType);
                    }}
                  >
                    Reserve
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
                  MY AMENITY BOOKINGS
      ============================================ */}
      <section className="amenities-section">
        <Title level={4} className="amenities-title">
          My Amenity Bookings
        </Title>

        <div className="amenities-scroll-wrapper">
          <div className="amenities-scroll-inner">
            {myBookings.length === 0 && (
              <div style={{ color: "#7a6a55", padding: "12px" }}>
                You don't have any bookings yet.
              </div>
            )}

            {myBookings.map((b) => (
              <Card
                key={b.id}
                hoverable
                className="amenity-card-scrolling"
                onClick={() => goToBookingDetail(b)}
              >
                <img
                  src={b.image}
                  alt={b.unitLabel}
                  className="amenity-scroll-img"
                />

                <div className="amenity-scroll-info">
                  <div className="amenity-scroll-title">{b.unitLabel}</div>
                  <div className="amenity-scroll-type">{b.typeName}</div>

                  <div className="amenity-scroll-type">
                    {dayjs(b.startTime).format("MMM D, HH:mm")} –{" "}
                    {dayjs(b.endTime).format("HH:mm")}
                  </div>

                  <Button
                    className="amenity-scroll-btn"
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    View
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
