const domain = "http://localhost:8080";

// ========== GET ALL ==========
export const getAllNewsletters = () => {
  const authToken = localStorage.getItem("authToken");
  const url = `${domain}/api/newsletters`;

  return fetch(url, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  }).then((response) => {
    if (response.status >= 300) {
      throw Error("Fail to get newsletters");
    }
    return response.json();
  });
};

// ========== GET NEWEST ==========
export const getNewestNewsletter = () => {
  const authToken = localStorage.getItem("authToken");
  const url = `${domain}/api/newsletters/newest`;

  return fetch(url, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  }).then((response) => {
    if (response.status >= 300) {
      throw Error("Fail to get newest newsletter");
    }
    return response.json();
  });
};

// ========== GET BY ID ==========
export const getNewsletterById = (id) => {
  const authToken = localStorage.getItem("authToken");
  const url = `${domain}/api/newsletters/${id}`;

  return fetch(url, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  }).then((response) => {
    if (response.status >= 300) {
      throw Error("Fail to get newsletter");
    }
    return response.json();
  });
};

// ========== CREATE (multipart/form-data) ==========
export const createNewsletter = ({ title, content, images, createdBy }) => {
  const authToken = localStorage.getItem("authToken");
  const url = `${domain}/api/newsletters`;

  const formData = new FormData();
  formData.append("title", title);
  formData.append("content", content);
  formData.append("createdBy", createdBy);

  if (images && images.length > 0) {
    images.forEach((img) => formData.append("images", img));
  }

  return fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${authToken}`, // ❗千万不能加 Content-Type
    },
    body: formData,
  }).then((response) => {
    if (response.status >= 300) {
      throw Error("Fail to create newsletter");
    }
  });
};

// ========== DELETE ==========
export const deleteNewsletter = (id) => {
  const authToken = localStorage.getItem("authToken");
  const url = `${domain}/api/newsletters/${id}`;

  return fetch(url, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  }).then((response) => {
    if (response.status >= 300) {
      throw Error("Fail to delete newsletter");
    }
  });
};
