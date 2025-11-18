import React, { useState, useEffect, useRef } from "react";
import { Card, Typography, Button } from "antd";
import { useNavigate } from "react-router-dom";
import "../../css/dashboard/DashboardNewsletter.css";

const { Text } = Typography;

const newsletterSlides = [
  "Community updates for all residents.",
  "Monthly improvements and policy changes.",
  "Maintenance schedules and service notices.",
  "Events happening this month.",
];

export default function DashboardNewsletter() {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  // Touch control
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);

  // Auto rotate every 1.5s unless hovered
  useEffect(() => {
    if (paused) return;

    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % newsletterSlides.length);
    }, 1500);

    return () => clearInterval(timer);
  }, [paused]);

  // Swipe handlers
  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e) => {
    touchEndX.current = e.changedTouches[0].clientX;

    const diff = touchStartX.current - touchEndX.current;

    if (diff > 50) {
      // swipe left
      setIndex((prev) => (prev + 1) % newsletterSlides.length);
    } else if (diff < -50) {
      // swipe right
      setIndex(
        (prev) => (prev - 1 + newsletterSlides.length) % newsletterSlides.length
      );
    }
  };

  return (
    <Card
      className="newsletter-rotating-card"
      bordered={false}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div className="newsletter-rotating-text-wrapper">
        <Text key={index} className="newsletter-rotating-text">
          {newsletterSlides[index]}
        </Text>
      </div>

      {/* Dot indicators */}
      <div className="newsletter-dots">
        {newsletterSlides.map((_, i) => (
          <div
            key={i}
            className={`newsletter-dot ${i === index ? "active" : ""}`}
            onClick={() => setIndex(i)}
          ></div>
        ))}
      </div>

      <Button
        className="newsletter-learn-more"
        onClick={(e) => {
          e.stopPropagation();
          navigate(`/newsletter/${index + 1}`);
        }}
      >
        Learn More →
      </Button>
    </Card>
  );
}
