import React, { useEffect, useState } from "react";
import { Card, Typography, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { getAllAmenityTypes, getUnitsByType } from "../amenity/utils";
import "../../css/dashboard/DashboardAmenitiesReserve.css";

const { Title } = Typography;

export default function DashboardAmenitiesReserve() {
  const [amenities, setAmenities] = useState([]);
  const navigate = useNavigate();

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

  return (
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
              <img src={a.image} alt={a.label} className="amenity-scroll-img" />

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
  );
}
