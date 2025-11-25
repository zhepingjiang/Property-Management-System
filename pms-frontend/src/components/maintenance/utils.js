const domain = "http://localhost:8080";

/* ================================
   GET ALL MAINTENANCE REQUESTS
================================ */
export const getAllRequests = async () => {
  const authToken = localStorage.getItem("authToken");
  const url = `${domain}/api/maintenance`;

  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${authToken}` },
  });

  if (response.status >= 300) {
    throw Error("Fail to get maintenance requests");
  }

  return response.json();
};

/* ================================
   GET REQUEST BY ID
================================ */
export const getRequestById = async (id) => {
  const authToken = localStorage.getItem("authToken");
  const url = `${domain}/api/maintenance/${id}`;

  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${authToken}` },
  });

  if (response.status >= 300) {
    throw Error("Fail to get maintenance request");
  }

  return response.json();
};

/* ================================
   CREATE REQUEST (multipart/form-data)
================================ */
/* ================================
   CREATE REQUEST (multipart/form-data)
================================ */
export const createRequest = async ({
  title,
  property,
  unit,
  category,
  description,
  priority,
  assignedTo,
  images,
}) => {
  const authToken = localStorage.getItem("authToken");
  const url = `${domain}/api/maintenance`;

  const formData = new FormData();
  formData.append("title", title);
  formData.append("property", property);
  formData.append("unit", unit);
  formData.append("category", category); // must match displayName
  formData.append("description", description);
  formData.append("priority", priority);

  if (assignedTo !== undefined && assignedTo !== null) {
    formData.append("assignedTo", assignedTo);
  }

  if (images?.length > 0) {
    images.forEach((img) => formData.append("images", img));
  }

  const response = await fetch(url, {
    method: "POST",
    headers: { Authorization: `Bearer ${authToken}` },
    body: formData,
  });

  if (!response.ok) {
    throw Error("Fail to create maintenance request");
  }
};
/* ================================
   UPDATE STATUS
================================ */
export const updateRequestStatus = async (id, status) => {
  const authToken = localStorage.getItem("authToken");
  const url = `${domain}/api/maintenance/${id}/status`;

  const formData = new FormData();
  formData.append("status", status);

  const response = await fetch(url, {
    method: "PATCH",
    headers: { Authorization: `Bearer ${authToken}` },
    body: formData,
  });

  if (response.status >= 300) {
    throw Error("Fail to update maintenance status");
  }
};

/* ================================
   UPDATE PRIORITY
================================ */
export const updateRequestPriority = async (id, priority) => {
  const authToken = localStorage.getItem("authToken");
  const url = `${domain}/api/maintenance/${id}/priority`;

  const formData = new FormData();
  formData.append("priority", priority);

  const response = await fetch(url, {
    method: "PATCH",
    headers: { Authorization: `Bearer ${authToken}` },
    body: formData,
  });

  if (response.status >= 300) {
    throw Error("Fail to update maintenance priority");
  }
};

/* ================================
   UPDATE ASSIGNED TO
================================ */
export const updateRequestAssignedTo = async (id, assignedTo) => {
  const authToken = localStorage.getItem("authToken");
  const url = `${domain}/api/maintenance/${id}/assign`;

  const formData = new FormData();
  formData.append("assignedTo", assignedTo);

  const response = await fetch(url, {
    method: "PATCH",
    headers: { Authorization: `Bearer ${authToken}` },
    body: formData,
  });

  if (response.status >= 300) {
    throw Error("Fail to update assigned user");
  }
};

/* ================================
   DELETE REQUEST
================================ */
export const deleteRequest = async (id) => {
  const authToken = localStorage.getItem("authToken");
  const url = `${domain}/api/maintenance/${id}`;

  const response = await fetch(url, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${authToken}` },
  });

  if (response.status >= 300) {
    throw Error("Fail to delete maintenance request");
  }
};

/* ================================
   GET REPLIES
================================ */
export const getRequestReplies = async (requestId) => {
  const authToken = localStorage.getItem("authToken");
  const url = `${domain}/api/maintenance/${requestId}/replies`;

  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${authToken}` },
  });

  if (response.status >= 300) {
    throw Error("Fail to get replies");
  }

  return response.json();
};

/* ================================
   CREATE REPLY
================================ */
export const createRequestReply = async ({ requestId, content }) => {
  const authToken = localStorage.getItem("authToken");
  const url = `${domain}/api/maintenance/${requestId}/replies`;

  const formData = new FormData();
  formData.append("content", content);

  const response = await fetch(url, {
    method: "POST",
    headers: { Authorization: `Bearer ${authToken}` },
    body: formData,
  });

  if (response.status >= 300) {
    throw Error("Fail to create reply");
  }

  return response.json();
};

/* ================================
   DELETE REPLY
================================ */
export const deleteRequestReply = async (replyId) => {
  const authToken = localStorage.getItem("authToken");
  const url = `${domain}/api/maintenance/replies/${replyId}`;

  const response = await fetch(url, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${authToken}` },
  });

  if (response.status >= 300) {
    throw Error("Fail to delete reply");
  }
};
