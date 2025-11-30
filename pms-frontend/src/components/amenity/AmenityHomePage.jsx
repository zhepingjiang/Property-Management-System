import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllAmenityTypes, getUnitsByType } from "./utils";
// Ensure this path matches the file created above
import "../../css/amenity/AmenityHomePage.css";

export default function AmenityHomePage() {
  const [amenities, setAmenities] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    try {
      const types = await getAllAmenityTypes();
      if (!types) return;

      const data = await Promise.all(
        types.map(async (t) => {
          const units = await getUnitsByType(t.id);
          return { ...t, units: units || [] };
        })
      );

      setAmenities(data);
    } catch (error) {
      console.error("Failed to load amenities", error);
    }
  };

  const goToReserve = (unit, type) => {
    navigate(`/amenity/reserve/${unit.id}`, { state: { unit, type } });
  };

  return (
    <div className="amenity-home-page">
      <h1 className="amenity-title">Amenities</h1>
      <p className="amenity-subtitle">
        Manage settings for each of the common areas and amenity spaces in your
        building.
      </p>

      {/* Amenity cards */}
      <div className="amenity-grid">
        {amenities.flatMap((type) =>
          type.units.map((unit) => (
            <div className="amenity-card-simple" key={unit.id}>
              <img
                className="amenity-simple-img"
                src={
                  type.imageUrls?.[0] ||
                  "https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&w=600"
                }
                alt={unit.label}
              />

              <div className="amenity-simple-title">{unit.label}</div>

              <button
                className="amenity-simple-btn"
                onClick={() => goToReserve(unit, type)}
              >
                View Reservations
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
