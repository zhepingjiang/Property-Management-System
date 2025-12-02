import React, { useState, useEffect } from "react";
import {
  Card,
  Typography,
  Button,
  Calendar,
  Alert,
  Space,
  Tag,
  Modal,
} from "antd"; // Import Modal
import { CheckCircleFilled } from "@ant-design/icons"; // Import Icon
import "../../css/amenity/AmenityReservationPage.css";
import dayjs from "dayjs";
import { useLocation, useNavigate } from "react-router-dom";
import { getBookingsForUnit, createBooking } from "./utils";

const { Title, Text } = Typography;

export default function AmenityReservationPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { unit, type } = location.state || {};

  useEffect(() => {
    if (!unit || !type) {
      navigate("/amenity/home");
    }
  }, [unit, type, navigate]);

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [error, setError] = useState("");
  const [availableTimes, setAvailableTimes] = useState([]);

  // NEW: State for Success Modal
  const [showSuccess, setShowSuccess] = useState(false);

  // 1. Generate Time Slots
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

  // 2. Fetch Availability
  const fetchAvailability = async (dateString) => {
    try {
      const bookings = await getBookingsForUnit(unit.id);
      if (!bookings) {
        setAvailableTimes(generateTimeSlots());
        return;
      }

      const bookingsForDate = bookings.filter((b) =>
        b.startTime.startsWith(dateString)
      );

      const bookedHours = new Set();
      bookingsForDate.forEach((b) => {
        let current = dayjs(b.startTime);
        const end = dayjs(b.endTime);
        while (current.isBefore(end)) {
          bookedHours.add(current.hour());
          current = current.add(1, "hour");
        }
      });

      const allSlots = generateTimeSlots().map((slot) => {
        const hour = Number(slot.value.split(":")[0]);
        return { ...slot, booked: bookedHours.has(hour) };
      });

      setAvailableTimes(allSlots);
    } catch (err) {
      console.error("Failed fetching availability:", err);
    }
  };

  const handleDateSelect = (date) => {
    if (date.isBefore(dayjs(), "day")) return;
    const formatted = date.format("YYYY-MM-DD");
    setSelectedDate(formatted);
    setSelectedTime(null);
    setError("");
    fetchAvailability(formatted);
  };

  const handleConfirm = async () => {
    if (!selectedDate) return setError("Please select a date.");
    if (!selectedTime) return setError("Please select a time.");

    const slot = availableTimes.find((s) => s.label === selectedTime);
    if (!slot) return setError("Invalid time.");

    const hour = Number(slot.value.split(":")[0]);
    const start = dayjs(selectedDate).hour(hour).minute(0).second(0);
    const end = start.add(1, "hour");

    const result = await createBooking({
      unitId: unit.id,
      guestCount: 1,
      startTime: start.toISOString(),
      endTime: end.toISOString(),
    });

    if (!result) return setError("Unable to create booking.");

    // SUCCESS: Instead of navigating immediately, show the Modal
    setShowSuccess(true);
  };

  // Handle closing the modal -> go to home
  const handleSuccessClose = () => {
    setShowSuccess(false);
    navigate("/amenity/home");
  };

  const isDayFullyBooked =
    selectedDate && availableTimes.every((t) => t.booked);

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
              <Text type="secondary" style={{ fontSize: "1rem" }}>
                {unit.address}
              </Text>
            )}

            <div className="reserve-time-box">
              <div>
                <Text strong>Date:</Text>{" "}
                {selectedDate ? (
                  <Tag
                    color="#8e6f43"
                    style={{
                      border: "none",
                      fontSize: "1rem",
                      padding: "2px 10px",
                    }}
                  >
                    {dayjs(selectedDate).format("MMMM D, YYYY")}
                  </Tag>
                ) : (
                  <Text type="secondary">Select a date</Text>
                )}
              </div>

              <div>
                <Text strong>Time:</Text>{" "}
                {selectedTime ? (
                  <Tag
                    color="#8e6f43"
                    style={{
                      border: "none",
                      fontSize: "1rem",
                      padding: "2px 10px",
                    }}
                  >
                    {selectedTime}
                  </Tag>
                ) : (
                  <Text type="secondary">Select a time</Text>
                )}
              </div>
            </div>

            {error && (
              <Alert
                type="error"
                message={error}
                style={{ marginBottom: 12 }}
                showIcon
              />
            )}

            <Button className="reserve-confirm-btn" onClick={handleConfirm}>
              Confirm Reservation
            </Button>
          </Card>
        </div>

        {/* RIGHT SIDE */}
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
              <Title level={5}>Available Time Slots</Title>

              {isDayFullyBooked && (
                <Alert
                  type="warning"
                  message="Fully Booked"
                  description="There are no available slots for this date."
                  showIcon
                  style={{ marginBottom: 16 }}
                />
              )}

              <Space wrap size={[12, 12]}>
                {availableTimes.map((slot) => (
                  <Button
                    key={slot.label}
                    disabled={slot.booked}
                    className={`time-slot-btn ${
                      selectedTime === slot.label ? "selected" : "default"
                    }`}
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

      {/* --- SUCCESS MODAL --- */}
      <Modal
        open={showSuccess}
        footer={null}
        closable={false}
        centered
        className="reserve-success-modal"
        onCancel={handleSuccessClose}
      >
        <CheckCircleFilled className="reserve-success-icon" />
        <div className="reserve-success-title">Reservation Confirmed!</div>
        <p className="reserve-success-desc">
          You have successfully booked <strong>{unit?.label}</strong> for
          <br />
          {selectedDate && dayjs(selectedDate).format("MMMM D, YYYY")} at{" "}
          {selectedTime}.
        </p>
        <Button className="reserve-success-btn" onClick={handleSuccessClose}>
          Back to Amenities
        </Button>
      </Modal>
    </div>
  );
}
