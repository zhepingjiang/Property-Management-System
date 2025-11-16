import React, { useState } from "react";
import { Card, Typography, Button, Calendar, Alert, Space, Tag } from "antd";
import "../../css/amenity/AmenityReservationPage.css";
import dayjs from "dayjs";

const { Title, Text } = Typography;

export default function AmenityReservationPage() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [error, setError] = useState("");
  const [availableTimes, setAvailableTimes] = useState([]); // time blocks for selected date

  // Example: generate 1-hour time slots from 9AM - 10PM
  const generateTimeSlots = () => {
    const times = [];
    for (let hour = 9; hour <= 21; hour++) {
      const start = dayjs().hour(hour).minute(0);
      const end = start.add(1, "hour");
      times.push({
        label: `${start.format("h A")} - ${end.format("h A")}`,
        value: `${hour}:00`,
      });
    }
    return times;
  };

  // Simulated backend call
  const fetchAvailability = async (date) => {
    // TODO: Replace with real API call:
    // GET /amenity/:id/availability?date=YYYY-MM-DD

    // Example: backend returns booked hours [10, 13, 17]
    const fakeBooked = [10, 13, 17];

    const allSlots = generateTimeSlots();
    const updated = allSlots.map((slot) => {
      const hour = parseInt(slot.value.split(":")[0]);
      return {
        ...slot,
        booked: fakeBooked.includes(hour),
      };
    });

    setAvailableTimes(updated);
  };

  const handleDateSelect = (date) => {
    // block past dates
    if (date.isBefore(dayjs(), "day")) return;

    const formatted = date.format("YYYY-MM-DD");
    setSelectedDate(formatted);
    setSelectedTime(null);
    setError("");

    // fetch availability
    fetchAvailability(formatted);
  };

  const handleConfirm = () => {
    if (!selectedDate) {
      setError("Please select a date.");
      return;
    }
    if (!selectedTime) {
      setError("Please select a time before confirming.");
      return;
    }
    setError("");

    // TODO: Call backend create reservation API
    console.log("Reserving:", selectedDate, selectedTime);
  };

  const isDayBooked = availableTimes.every((t) => t.booked);

  return (
    <div className="reserve-content-wrapper">
      <div className="reserve-container">
        {/* LEFT SIDE */}
        <div className="reserve-left">
          <Card className="reserve-pic-card">
            <img
              alt="amenity"
              className="reserve-image"
              src="https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=1600"
            />
          </Card>

          <Card className="reserve-info-card">
            <Title level={5}>Swimming Pool</Title>
            <Text type="secondary" style={{ fontSize: "14px" }}>
              Located on Floor 2, East Wing
            </Text>

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

        {/* RIGHT SIDE — CALENDAR + TIMES */}
        <div className="reserve-right">
          <Card className="reserve-calendar-card">
            <Calendar
              fullscreen={false}
              onSelect={handleDateSelect}
              disabledDate={(date) => date.isBefore(dayjs(), "day")}
            />
          </Card>

          {/* TIME SLOT SECTION */}
          {selectedDate && (
            <Card className="reserve-time-card">
              <Title level={5}>Select a Time</Title>

              {isDayBooked && (
                <Alert
                  type="error"
                  message="This amenity is fully booked for this day."
                  style={{ marginBottom: 12 }}
                />
              )}

              <Space wrap>
                {availableTimes.map((t) => (
                  <Button
                    key={t.label}
                    disabled={t.booked}
                    type={selectedTime === t.label ? "primary" : "default"}
                    onClick={() => {
                      if (!t.booked) {
                        setSelectedTime(t.label);
                        setError("");
                      }
                    }}
                  >
                    {t.label}
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
