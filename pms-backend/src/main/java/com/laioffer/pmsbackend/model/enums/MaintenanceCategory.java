package com.laioffer.pmsbackend.model.enums;

public enum MaintenanceCategory {

    APPLIANCES("Appliances"),
    ELECTRICAL("Electrical"),
    HOUSE_EXTERIOR("House Exterior"),
    HOUSEHOLD("Household"),
    OUTDOORS("Outdoors"),
    PLUMBING("Plumbing"),
    PARKING_GARAGE("Parking & Garage"),
    NOISE_DISTURBANCE("Noise / Disturbance"),
    OTHER("Other");

    private final String displayName;

    MaintenanceCategory(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }
}