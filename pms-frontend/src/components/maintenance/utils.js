const domain = "http://localhost:8080";

/* ================================
   GET ALL MAINTENANCE REQUESTS
   (Current User Only)
================================ */
export const getAllRequests = () => {
  const authToken = localStorage.getItem("authToken");
  const url = `${domain}/api/maintenance`;

  return fetch(url, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  }).then((response) => {
    if (response.status >= 300) {
      throw Error("Fail to get maintenance requests");
    }
    return response.json();
  });
};

/* ================================
   GET REQUEST BY ID
================================ */
export const getRequestById = (id) => {
  const authToken = localStorage.getItem("authToken");
  const url = `${domain}/api/maintenance/${id}`;

  return fetch(url, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  }).then((response) => {
    if (response.status >= 300) {
      throw Error("Fail to get maintenance request");
    }
    return response.json();
  });
};

/* ================================
   CREATE REQUEST (multipart/form-data)
================================ */
export const createRequest = ({
  authorId,
  facility,
  issueType,
  description,
  priority,
  assignedTo,
  images,
}) => {
  const authToken = localStorage.getItem("authToken");
  const url = `${domain}/api/maintenance`;

  const formData = new FormData();
  formData.append("authorId", authorId);
  formData.append("facility", facility);
  formData.append("issueType", issueType);
  formData.append("description", description);
  formData.append("priority", priority);
  formData.append("assignedTo", assignedTo);

  if (images && images.length > 0) {
    images.forEach((img) => formData.append("images", img));
  }

  return fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${authToken}`, // ❗ no content-type
    },
    body: formData,
  }).then((response) => {
    if (response.status >= 300) {
      throw Error("Fail to create maintenance request");
    }
  });
};

/* ================================
   UPDATE STATUS (TRUSTEE)
================================ */
export const updateRequestStatus = (id, status) => {
  const authToken = localStorage.getItem("authToken");
  const url = `${domain}/api/maintenance/${id}/status`;

  const formData = new FormData();
  formData.append("status", status);

  return fetch(url, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
    body: formData,
  }).then((response) => {
    if (response.status >= 300) {
      throw Error("Fail to update maintenance status");
    }
  });
};

/* ================================
   UPDATE PRIORITY (TRUSTEE)
================================ */
export const updateRequestPriority = (id, priority) => {
  const authToken = localStorage.getItem("authToken");
  const url = `${domain}/api/maintenance/${id}/priority`;

  const formData = new FormData();
  formData.append("priority", priority);

  return fetch(url, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
    body: formData,
  }).then((response) => {
    if (response.status >= 300) {
      throw Error("Fail to update maintenance priority");
    }
  });
};

/* ================================
   UPDATE ASSIGNED TO (TRUSTEE)
================================ */
export const updateRequestAssignedTo = (id, assignedTo) => {
  const authToken = localStorage.getItem("authToken");
  const url = `${domain}/api/maintenance/${id}/assign`;

  const formData = new FormData();
  formData.append("assignedTo", assignedTo);

  return fetch(url, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
    body: formData,
  }).then((response) => {
    if (response.status >= 300) {
      throw Error("Fail to update assigned user");
    }
  });
};

/* ================================
   DELETE REQUEST (TRUSTEE)
================================ */
export const deleteRequest = (id) => {
  const authToken = localStorage.getItem("authToken");
  const url = `${domain}/api/maintenance/${id}`;

  return fetch(url, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  }).then((response) => {
    if (response.status >= 300) {
      throw Error("Fail to delete maintenance request");
    }
  });
};

/* ================================
   GET ALL REPLIES FOR A REQUEST
================================ */
export const getRequestReplies = (requestId) => {
  const authToken = localStorage.getItem("authToken");
  const url = `${domain}/api/maintenance/${requestId}/replies`;

  return fetch(url, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  }).then((response) => {
    if (response.status >= 300) {
      throw Error("Fail to get replies");
    }
    return response.json();
  });
};

/* ================================
   CREATE REPLY FOR A REQUEST
================================ */
export const createRequestReply = ({ requestId, authorId, content }) => {
  const authToken = localStorage.getItem("authToken");
  const url = `${domain}/api/maintenance/${requestId}/replies`;

  const formData = new FormData();
  formData.append("authorId", authorId);
  formData.append("content", content);

  return fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
    body: formData,
  }).then((response) => {
    if (response.status >= 300) {
      throw Error("Fail to create reply");
    }
    return response.json();
  });
};

/* ================================
   DELETE A REPLY
================================ */
export const deleteRequestReply = (replyId) => {
  const authToken = localStorage.getItem("authToken");
  const url = `${domain}/api/maintenance/replies/${replyId}`;

  return fetch(url, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  }).then((response) => {
    if (response.status >= 300) {
      throw Error("Fail to delete reply");
    }
  });
};
