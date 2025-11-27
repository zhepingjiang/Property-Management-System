const domain = "http://localhost:8080";

export const createAlert = async ({ title, content, images, createdBy }) => {
  const token = localStorage.getItem("authToken");
  const url = `${domain}/api/alerts`;

  const formData = new FormData();
  formData.append("title", title);
  formData.append("content", content);
  formData.append("createdBy", createdBy);

  if (images && images.length > 0) {
    images.forEach((file) => formData.append("images", file));
  }

  fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData, // ❗ DO NOT set Content-Type manually
  }).then((response) => {
    if (response.status >= 300) {
      throw new Error("Failed to create alert");
    }

    return response.json();
  });
};
