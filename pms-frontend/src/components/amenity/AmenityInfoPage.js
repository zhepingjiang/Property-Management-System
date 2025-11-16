import React from "react";
import { Card, Button, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import "../../css/amenity/AmenityInfoPage.css";

const { Title, Paragraph, Text } = Typography;

export default function AmenityInfoPage() {
  const navigate = useNavigate();

  return (
    <div className="amenity-content-wrapper">
      <div className="amenity-container">
        {/* Image section */}
        <Card className="amenity-image-card">
          <img
            className="amenity-image"
            src="https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="amenity"
          />
        </Card>

        {/* Lower info section */}
        <div className="amenity-lower-section">
          {/* Left: info */}
          <Card className="amenity-info-card">
            <Title level={4}>Available Time</Title>
            <Paragraph>
              Open daily: 6:00 AM – 10:00 PM
              <br />
              Reservations required for peak hours.
            </Paragraph>
          </Card>

          {/* Right: reserve section */}
          <div className="amenity-reserve-section">
            <Text type="secondary" className="reserve-helper-text">
              Reserve now to secure your spot
            </Text>

            <Button
              type="primary"
              size="middle"
              className="amenity-reserve-btn"
              onClick={() => navigate("/amenity/reserve")}
            >
              Reserve
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
