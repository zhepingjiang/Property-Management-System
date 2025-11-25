import React, { useState, useEffect } from "react";
import { Card, Typography, Button, Calendar, Alert, Space, Tag } from "antd";
import "../../css/amenity/AmenityReservationPage.css";
import dayjs from "dayjs";
import { useLocation, useNavigate } from "react-router-dom";
import { getBookingsForUnit, createBooking } from "./utils";

const { Title, Text } = Typography;

export default function AmenityReservationPage() {
  const location = useLocation();
  const navigate = useNavigate();

  // Extract unit + type passed from AmenityHomePage
  const { unit, type } = location.state || {};

  // If user goes directly without selecting
  useEffect(() => {
    if (!unit || !type) {
      navigate("/amenity/home");
    }
  }, [unit, type, navigate]);

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [error, setError] = useState("");
  const [availableTimes, setAvailableTimes] = useState([]);

  /* ==========================================================
     1. Generate Time Slots (use type.maxBookingDuration if needed)
  ========================================================== */
  const generateTimeSlots = () => {
    const times = [];
    for (let hour = 9; hour <= 21; hour++) {
      const start = dayjs().hour(hour).minute(0).second(0);
      const end = start.add(1, "hour");
      times.push({
        label: `${start.format("h A")} - ${end.format("h A")}`,
        value: `${hour}:00`,
      });
    }
    return times;
  };

  /* ==========================================================
     2. Example backend availability simulation
  ========================================================== */
  const fetchAvailability = async (dateString) => {
    try {
      // 1. Fetch all bookings for this unit
      const bookings = await getBookingsForUnit(unit.id);
      if (!bookings) {
        console.error("No bookings returned");
        setAvailableTimes(generateTimeSlots());
        return;
      }

      // 2. Filter bookings that match the selected date (YYYY-MM-DD)
      const bookingsForDate = bookings.filter((b) =>
        b.startTime.startsWith(dateString)
      );

      // 3. Convert booked time ranges → booked hours (e.g., 10:00–12:00 → [10,11])
      const bookedHours = new Set();

      bookingsForDate.forEach((b) => {
        const start = dayjs(b.startTime);
        const end = dayjs(b.endTime);

        let current = start;

        // Mark each hour as booked
        while (current.isBefore(end)) {
          bookedHours.add(current.hour());
          current = current.add(1, "hour");
        }
      });

      // 4. Generate 9AM–9PM slots and tag which are booked
      const allSlots = generateTimeSlots().map((slot) => {
        const hour = Number(slot.value.split(":")[0]); // "10:00" → 10
        return { ...slot, booked: bookedHours.has(hour) };
      });

      setAvailableTimes(allSlots);
    } catch (err) {
      console.error("Failed fetching availability:", err);
    }
  };

  /* ==========================================================
     3. Handle date selection
  ========================================================== */
  const handleDateSelect = (date) => {
    if (date.isBefore(dayjs(), "day")) return;

    const formatted = date.format("YYYY-MM-DD");
    setSelectedDate(formatted);
    setSelectedTime(null);
    setError("");

    fetchAvailability(formatted);
  };

  /* ==========================================================
     4. Confirm Reservation
  ========================================================== */
  const handleConfirm = async () => {
    if (!selectedDate) {
      setError("Please select a date.");
      return;
    }
    if (!selectedTime) {
      setError("Please select a time before confirming.");
      return;
    }

    // Find slot from availableTimes using label
    const slot = availableTimes.find((s) => s.label === selectedTime);
    if (!slot) {
      setError("Invalid time selection.");
      return;
    }

    const hour = Number(slot.value.split(":")[0]); // e.g. "16:00" → 16

    // Build startTime and endTime strings
    const start = dayjs(selectedDate).hour(hour).minute(0).second(0);

    const end = start.add(1, "hour");

    const startTimeIso = start.toISOString(); // backend uses Instant
    const endTimeIso = end.toISOString();

    // DEFAULT guestCount = 1 for now
    const guestCount = 1;

    const result = await createBooking({
      unitId: unit.id,
      guestCount,
      startTime: startTimeIso,
      endTime: endTimeIso,
    });

    if (!result) {
      setError("Unable to create booking. Please try again.");
      return;
    }

    // success → navigate or show message
    navigate("/amenity/home", {
      state: { successMessage: "Reservation created successfully!" },
    });
  };
  const isDayFullyBooked =
    selectedDate && availableTimes.every((t) => t.booked);

  /* ==========================================================
     5. Render UI
  ========================================================== */
  return (
    <div className="reserve-content-wrapper">
      <div className="reserve-container">
        {/* LEFT SIDE */}
        <div className="reserve-left">
          <Card className="reserve-pic-card">
            <img
              alt={type?.name}
              className="reserve-image"
              src={type?.imageUrls?.[0] || "/placeholder.jpg"}
            />
          </Card>

          <Card className="reserve-info-card">
            <Title level={4}>{unit?.label}</Title>

            {unit?.address && (
              <Text type="secondary" style={{ fontSize: "14px" }}>
                {`Located at ${unit.address}`}
              </Text>
            )}

            <div className="reserve-time-box">
              <Text strong>Date Selected:</Text>
              <br />
              {selectedDate ? (
                <Text>{selectedDate}</Text>
              ) : (
                <Text type="secondary">No date selected</Text>
              )}

              <br />
              <br />
              <Text strong>Time Selected:</Text>
              <br />
              {selectedTime ? (
                <Tag color="blue">{selectedTime}</Tag>
              ) : (
                <Text type="secondary">No time selected</Text>
              )}
            </div>

            {error && (
              <Alert type="error" message={error} className="reserve-error" />
            )}

            <Button
              type="primary"
              size="large"
              onClick={handleConfirm}
              className="reserve-confirm-btn"
            >
              Confirm Reservation
            </Button>
          </Card>
        </div>

        {/* RIGHT SIDE — CALENDAR + TIME SLOTS */}
        <div className="reserve-right">
          <Card className="reserve-calendar-card">
            <Calendar
              fullscreen={false}
              onSelect={handleDateSelect}
              disabledDate={(date) => date.isBefore(dayjs(), "day")}
            />
          </Card>

          {selectedDate && (
            <Card className="reserve-time-card">
              <Title level={5}>Select a Time</Title>

              {isDayFullyBooked && (
                <Alert
                  type="error"
                  message="This amenity is fully booked for this day."
                  style={{ marginBottom: 10 }}
                />
              )}

              <Space wrap>
                {availableTimes.map((slot) => (
                  <Button
                    key={slot.label}
                    disabled={slot.booked}
                    type={selectedTime === slot.label ? "primary" : "default"}
                    onClick={() => {
                      if (!slot.booked) {
                        setSelectedTime(slot.label);
                        setError("");
                      }
                    }}
                  >
                    {slot.label}
                  </Button>
                ))}
              </Space>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
