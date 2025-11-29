const domain = "http://localhost:8080";

// ===== optional toast/snackbar helper =====
const notifyError = (msg) => {
  console.warn(msg);
  // Optional: Add logic here to show a UI toast
};

// ================================
// GET ALL EVENTS
// ================================
export const getAllEvents = async () => {
  const authToken = localStorage.getItem("authToken");

  try {
    const response = await fetch(`${domain}/api/events`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      notifyError("Failed to load events");
      return null;
    }

    const events = await response.json();

    // Ensure every event has image_urls
    return events.map((event) => ({
      ...event,
      image_urls: event.image_urls || [],
    }));
  } catch (err) {
    notifyError("Network error while loading events");
    return null;
  }
};

// ================================
// GET NEWEST EVENT
// ================================
export const getNewestEvent = async () => {
  const authToken = localStorage.getItem("authToken");

  try {
    const response = await fetch(`${domain}/api/events/newest`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      notifyError("Failed to load newest event");
      return null;
    }

    const event = await response.json();

    return {
      ...event,
      image_urls: event.image_urls || [],
    };
  } catch (err) {
    notifyError("Network error while loading newest event");
    return null;
  }
};

// ================================
// GET EVENT BY ID
// ================================
export const getEventById = async (id) => {
  const authToken = localStorage.getItem("authToken");

  try {
    const response = await fetch(`${domain}/api/events/${id}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      notifyError("Failed to load event");
      return null;
    }

    const event = await response.json();

    return {
      ...event,
      image_urls: event.image_urls || [],
    };
  } catch (err) {
    notifyError("Network error while loading event");
    return null;
  }
};

// ================================
// CREATE EVENT
// ================================
export const createEvent = async ({ title, content, images, createdBy }) => {
  const authToken = localStorage.getItem("authToken");
  const url = `${domain}/api/events`;

  const formData = new FormData();
  formData.append("title", title);
  formData.append("content", content);
  formData.append("createdBy", createdBy.toString());

  if (images && images.length > 0) {
    images.forEach((img) => formData.append("images", img));
  }

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${authToken}`,
        // Note: Do not set Content-Type manually for FormData
      },
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      notifyError(`Failed to create event: ${errorText}`);
      return null;
    }

    const createdEvent = await response.json();

    return {
      ...createdEvent,
      image_urls: createdEvent.image_urls || [],
    };
  } catch (err) {
    notifyError("Network error while creating event");
    return null;
  }
};

// ================================
// DELETE EVENT
// ================================
export const deleteEvent = async (id) => {
  const authToken = localStorage.getItem("authToken");

  try {
    const response = await fetch(`${domain}/api/events/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      notifyError("Failed to delete event");
      return false;
    }

    return true;
  } catch (err) {
    notifyError("Network error while deleting event");
    return false;
  }
};

// ================================
// HELPERS
// ================================
export const getEventImageUrls = (event) => {
  if (event.image_urls && event.image_urls.length > 0) {
    return event.image_urls;
  }
  if (event.images && event.images.length > 0) {
    return event.images;
  }
  return [];
};

export const getFirstEventImageUrl = (event) => {
  const imageUrls = getEventImageUrls(event);
  return imageUrls.length > 0 ? imageUrls[0] : null;
};
