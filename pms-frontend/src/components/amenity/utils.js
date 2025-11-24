const domain = "http://localhost:8080";

/* ============================================================
   AMENITY TYPE CONTROLLER
   (GET, CREATE, DELETE Types)
============================================================ */

/** Get all active amenity types */
export const getAllAmenityTypes = async () => {
  const url = `${domain}/api/amenities/types`;
  const authToken = localStorage.getItem("authToken");

  try {
    const resp = await fetch(url, {
      headers: { Authorization: `Bearer ${authToken}` },
    });
    if (!resp.ok) return null;
    return await resp.json();
  } catch (err) {
    console.error("Failed to get amenity types:", err);
    return null;
  }
};

/** Get amenity type by ID */
export const getAmenityTypeById = async (typeId) => {
  const url = `${domain}/api/amenities/types/${typeId}`;
  const authToken = localStorage.getItem("authToken");

  try {
    const resp = await fetch(url, {
      headers: { Authorization: `Bearer ${authToken}` },
    });
    if (!resp.ok) return null;
    return await resp.json();
  } catch (err) {
    console.error("Failed to get amenity type:", err);
    return null;
  }
};

/** Create a new amenity type (Trustee only) */
export const createAmenityType = async ({
  name,
  description,
  maxBookingDurationMinutes,
  isActive,
}) => {
  const authToken = localStorage.getItem("authToken");
  const url = `${domain}/api/amenities/types`;

  const formData = new FormData();
  formData.append("name", name);
  if (description) formData.append("description", description);
  if (maxBookingDurationMinutes)
    formData.append("maxBookingDurationMinutes", maxBookingDurationMinutes);
  if (isActive !== undefined) formData.append("isActive", isActive);

  try {
    const resp = await fetch(url, {
      method: "POST",
      headers: { Authorization: `Bearer ${authToken}` },
      body: formData,
    });

    if (!resp.ok) return null;
    return await resp.json();
  } catch (err) {
    console.error("Failed to create amenity type:", err);
    return null;
  }
};

/** Delete an amenity type (Trustee only) */
export const deleteAmenityType = async (typeId) => {
  const authToken = localStorage.getItem("authToken");
  const url = `${domain}/api/amenities/types/${typeId}`;

  try {
    const resp = await fetch(url, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${authToken}` },
    });

    return resp.ok;
  } catch (err) {
    console.error("Failed to delete amenity type:", err);
    return false;
  }
};

/* ============================================================
   AMENITY UNIT CONTROLLER
   (GET Units by Type, CREATE Unit, DELETE Unit)
============================================================ */

/** Get all units under a specific amenity type */
export const getUnitsByType = async (typeId) => {
  const authToken = localStorage.getItem("authToken");
  const url = `${domain}/api/amenities/types/${typeId}/units`;

  try {
    const resp = await fetch(url, {
      headers: { Authorization: `Bearer ${authToken}` },
    });
    if (!resp.ok) return null;
    return await resp.json();
  } catch (err) {
    console.error("Failed to get units:", err);
    return null;
  }
};

/** Create an amenity unit (Trustee only) */
export const createAmenityUnit = async ({
  typeId,
  label,
  capacity,
  address,
  isActive,
}) => {
  const authToken = localStorage.getItem("authToken");
  const url = `${domain}/api/amenities/units`;

  const formData = new FormData();
  formData.append("typeId", typeId);
  formData.append("label", label);
  if (capacity !== undefined) formData.append("capacity", capacity);
  if (address) formData.append("address", address);
  if (isActive !== undefined) formData.append("isActive", isActive);

  try {
    const resp = await fetch(url, {
      method: "POST",
      headers: { Authorization: `Bearer ${authToken}` },
      body: formData,
    });

    if (!resp.ok) return null;
    return await resp.json();
  } catch (err) {
    console.error("Failed to create amenity unit:", err);
    return null;
  }
};

/** Delete an amenity unit (Trustee only) */
export const deleteAmenityUnit = async (unitId) => {
  const authToken = localStorage.getItem("authToken");
  const url = `${domain}/api/amenities/units/${unitId}`;

  try {
    const resp = await fetch(url, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${authToken}` },
    });

    return resp.ok;
  } catch (err) {
    console.error("Failed to delete amenity unit:", err);
    return false;
  }
};

/* ============================================================
   AMENITY BOOKING CONTROLLER
   (GET Bookings, Create Booking, Delete Booking)
============================================================ */

/** Get all bookings for a specific unit */
export const getBookingsForUnit = async (unitId) => {
  const authToken = localStorage.getItem("authToken");
  const url = `${domain}/api/amenities/bookings/unit/${unitId}`;

  try {
    const resp = await fetch(url, {
      headers: { Authorization: `Bearer ${authToken}` },
    });
    if (!resp.ok) return null;

    return await resp.json();
  } catch (err) {
    console.error("Failed to get bookings for unit:", err);
    return null;
  }
};

/** Trustee: get all bookings of ANY user */
export const getBookingsForUser = async (userId) => {
  const authToken = localStorage.getItem("authToken");
  const url = `${domain}/api/amenities/bookings/user/${userId}`;

  try {
    const resp = await fetch(url, {
      headers: { Authorization: `Bearer ${authToken}` },
    });
    if (!resp.ok) return null;

    return await resp.json();
  } catch (err) {
    console.error("Failed to get user bookings:", err);
    return null;
  }
};

/** Get MY history bookings */
export const getMyHistoryBookings = async () => {
  const authToken = localStorage.getItem("authToken");
  const url = `${domain}/api/amenities/bookings/my/history`;

  try {
    const resp = await fetch(url, {
      headers: { Authorization: `Bearer ${authToken}` },
    });
    if (!resp.ok) return null;

    return await resp.json();
  } catch (err) {
    console.error("Failed to get my history bookings:", err);
    return null;
  }
};

/** Get MY future bookings */
export const getMyFutureBookings = async () => {
  const authToken = localStorage.getItem("authToken");
  const url = `${domain}/api/amenities/bookings/my/future`;

  try {
    const resp = await fetch(url, {
      headers: { Authorization: `Bearer ${authToken}` },
    });
    if (!resp.ok) return null;

    return await resp.json();
  } catch (err) {
    console.error("Failed to get my future bookings:", err);
    return null;
  }
};

/** Get ALL my bookings */
export const getMyBookings = async () => {
  const authToken = localStorage.getItem("authToken");
  const url = `${domain}/api/amenities/bookings/my`;

  try {
    const resp = await fetch(url, {
      headers: { Authorization: `Bearer ${authToken}` },
    });
    if (!resp.ok) return null;

    return await resp.json();
  } catch (err) {
    console.error("Failed to get my bookings:", err);
    return null;
  }
};

/** Trustee: Get ALL bookings */
export const getAllBookings = async () => {
  const authToken = localStorage.getItem("authToken");
  const url = `${domain}/api/amenities/bookings`;

  try {
    const resp = await fetch(url, {
      headers: { Authorization: `Bearer ${authToken}` },
    });
    if (!resp.ok) return null;

    return await resp.json();
  } catch (err) {
    console.error("Failed to get all bookings:", err);
    return null;
  }
};

/** Create a booking */
export const createBooking = async ({
  unitId,
  guestCount,
  startTime,
  endTime,
}) => {
  const authToken = localStorage.getItem("authToken");
  const url = `${domain}/api/amenities/bookings`;

  const formData = new FormData();
  formData.append("unitId", unitId);
  formData.append("guestCount", guestCount);
  /*startTime/endTime format: e.g. 2025-12-10T16:00:00Z*/
  formData.append("startTime", new Date(startTime).toISOString());
  formData.append("endTime", new Date(endTime).toISOString());

  try {
    const resp = await fetch(url, {
      method: "POST",
      headers: { Authorization: `Bearer ${authToken}` },
      body: formData,
    });

    if (!resp.ok) return null;
    return await resp.json();
  } catch (err) {
    console.error("Failed to create booking:", err);
    return null;
  }
};

/** Delete a booking (Trustee OR owner) */
export const deleteBooking = async (bookingId) => {
  const authToken = localStorage.getItem("authToken");
  const url = `${domain}/api/amenities/bookings/${bookingId}`;

  try {
    const resp = await fetch(url, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${authToken}` },
    });
    return resp.ok;
  } catch (err) {
    console.error("Failed to delete booking:", err);
    return false;
  }
};
