const domain = "http://localhost:8080";

// ===== optional toast/snackbar helper =====
const notifyError = (msg) => {
  console.warn(msg);
  // TODO: replace with:
  // enqueueSnackbar(msg, { variant: "error" });
  // or Toast.error(msg)
};

// ================================
// GET ALL NEWSLETTERS
// ================================
export const getAllNewsletters = async () => {
  const authToken = localStorage.getItem("authToken");

  try {
    const response = await fetch(`${domain}/api/newsletters`, {
      headers: { Authorization: `Bearer ${authToken}` },
    });

    if (!response.ok) {
      notifyError("Failed to load newsletters");
      return null;
    }

    return await response.json();
  } catch (err) {
    notifyError("Network error while loading newsletters");
    return null;
  }
};

// ================================
// GET NEWEST NEWSLETTER
// ================================
export const getNewestNewsletter = async () => {
  const authToken = localStorage.getItem("authToken");

  try {
    const response = await fetch(`${domain}/api/newsletters/newest`, {
      headers: { Authorization: `Bearer ${authToken}` },
    });

    if (!response.ok) {
      notifyError("Failed to load newest newsletter");
      return null;
    }

    return await response.json();
  } catch (err) {
    notifyError("Network error while loading newest newsletter");
    return null;
  }
};

// ================================
// GET NEWSLETTER BY ID
// ================================
export const getNewsletterById = async (id) => {
  const authToken = localStorage.getItem("authToken");

  try {
    const response = await fetch(`${domain}/api/newsletters/${id}`, {
      headers: { Authorization: `Bearer ${authToken}` },
    });

    if (!response.ok) {
      notifyError("Failed to load newsletter");
      return null;
    }

    return await response.json();
  } catch (err) {
    notifyError("Network error while loading newsletter");
    return null;
  }
};

// ================================
// CREATE NEWSLETTER (multipart/form-data)
// ================================
export const createNewsletter = async ({
  title,
  content,
  images,
  createdBy,
}) => {
  const authToken = localStorage.getItem("authToken");
  const url = `${domain}/api/newsletters`;

  const formData = new FormData();
  formData.append("title", title);
  formData.append("content", content);
  formData.append("createdBy", createdBy);

  if (images && images.length > 0) {
    images.forEach((img) => formData.append("images", img));
  }

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { Authorization: `Bearer ${authToken}` },
      body: formData,
    });

    if (!response.ok) {
      notifyError("Failed to create newsletter");
      return false;
    }

    return true;
  } catch (err) {
    notifyError("Network error while creating newsletter");
    return false;
  }
};

// ================================
// DELETE NEWSLETTER
// ================================
export const deleteNewsletter = async (id) => {
  const authToken = localStorage.getItem("authToken");

  try {
    const response = await fetch(`${domain}/api/newsletters/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${authToken}` },
    });

    if (!response.ok) {
      notifyError("Failed to delete newsletter");
      return false;
    }

    return true;
  } catch (err) {
    notifyError("Network error while deleting newsletter");
    return false;
  }
};
