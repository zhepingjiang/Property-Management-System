javascript
const domain = "http://localhost:8080";

// ===== optional toast/snackbar helper =====
const notifyError = (msg) => {
  console.warn(msg);
  // TODO: replace with:
  // enqueueSnackbar(msg, { variant: "error" });
  // or Toast.error(msg)
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
        'Content-Type': 'application/json'
      },
    });

    if (!response.ok) {
      notifyError("Failed to load events");
      return null;
    }

    const events = await response.json();
    
    // 确保每个事件都有 image_urls 字段
    return events.map(event => ({
      ...event,
      image_urls: event.image_urls || []  // 如果没有图片，设置为空数组
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
        'Content-Type': 'application/json'
      },
    });

    if (!response.ok) {
      notifyError("Failed to load newest event");
      return null;
    }

    const event = await response.json();
    
    // 确保事件有 image_urls 字段
    return {
      ...event,
      image_urls: event.image_urls || []  // 如果没有图片，设置为空数组
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
        'Content-Type': 'application/json'
      },
    });

    if (!response.ok) {
      notifyError("Failed to load event");
      return null;
    }

    const event = await response.json();
    
    // 确保事件有 image_urls 字段
    return {
      ...event,
      image_urls: event.image_urls || []  // 如果没有图片，设置为空数组
    };
  } catch (err) {
    notifyError("Network error while loading event");
    return null;
  }
};

// ================================
// CREATE EVENT (multipart/form-data)
// ================================
export const createEvent = async ({
  title,
  content,
  images,
  createdBy,
}) => {
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
        // 注意：不要设置 Content-Type，浏览器会自动设置 multipart/form-data 的边界
      },
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      notifyError(`Failed to create event: ${errorText}`);
      return null;
    }

    const createdEvent = await response.json();
    
    // 确保返回的事件有 image_urls 字段
    return {
      ...createdEvent,
      image_urls: createdEvent.image_urls || []
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
        'Content-Type': 'application/json'
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
// HELPER FUNCTION TO GET IMAGE URLS
// ================================
export const getEventImageUrls = (event) => {
  // 如果事件已经有 image_urls，直接返回
  if (event.image_urls && event.image_urls.length > 0) {
    return event.image_urls;
  }
  
  // 如果后端返回的是其他字段名，可以在这里添加映射
  if (event.images && event.images.length > 0) {
    return event.images;
  }
  
  // 如果没有图片，返回空数组
  return [];
};

// ================================
// HELPER FUNCTION TO GET FIRST IMAGE URL
// ================================
export const getFirstEventImageUrl = (event) => {
  const imageUrls = getEventImageUrls(event);
  return imageUrls.length > 0 ? imageUrls[0] : null;
};