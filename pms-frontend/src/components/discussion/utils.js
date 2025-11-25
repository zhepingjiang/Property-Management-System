const domain = "http://localhost:8080";

/* ================================
   GET ALL POSTS
================================ */
export const getAllPosts = async () => {
  const authToken = localStorage.getItem("authToken");
  const url = `${domain}/api/posts`;

  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${authToken}` },
  });

  if (!response.ok) {
    throw new Error("Failed to get posts");
  }

  return response.json();
};

/* ================================
   GET NEWEST POST
================================ */
export const getNewestPost = async () => {
  const authToken = localStorage.getItem("authToken");
  const url = `${domain}/api/posts/newest`;

  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${authToken}` },
  });

  if (!response.ok) {
    throw new Error("Failed to get newest post");
  }

  return response.json();
};

/* ================================
   GET POST BY ID
================================ */
export const getPostById = async (id) => {
  const authToken = localStorage.getItem("authToken");
  const url = `${domain}/api/posts/${id}`;

  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${authToken}` },
  });

  if (!response.ok) {
    throw new Error("Failed to get post");
  }

  return response.json();
};

/* ================================
   GET POSTS BY AUTHOR
================================ */
export const getPostsByAuthor = async (authorId) => {
  const authToken = localStorage.getItem("authToken");
  const url = `${domain}/api/posts/author/${authorId}`;

  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${authToken}` },
  });

  if (!response.ok) {
    throw new Error("Failed to get author's posts");
  }

  return response.json();
};

/* ================================
   CREATE POST (multipart/form-data)
================================ */
export const createPost = async ({ content, images }) => {
  const authToken = localStorage.getItem("authToken");
  const url = `${domain}/api/posts`;

  const formData = new FormData();
  formData.append("content", content);

  if (images?.length > 0) {
    images.forEach((img) => formData.append("images", img));
  }

  const response = await fetch(url, {
    method: "POST",
    headers: { Authorization: `Bearer ${authToken}` }, // Do NOT set Content-Type manually for FormData
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to create post");
  }
};

/* ================================
   UPDATE POST STATUS
================================ */
export const updatePostStatus = async (id, status) => {
  const authToken = localStorage.getItem("authToken");
  const url = `${domain}/api/posts/${id}/status`;

  const formData = new FormData();
  formData.append("status", status);

  const response = await fetch(url, {
    method: "PATCH",
    headers: { Authorization: `Bearer ${authToken}` },
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to update post status");
  }
};

/* ================================
   DELETE POST
================================ */
export const deletePost = async (id) => {
  const authToken = localStorage.getItem("authToken");
  const url = `${domain}/api/posts/${id}`;

  const response = await fetch(url, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${authToken}` },
  });

  if (!response.ok) {
    throw new Error("Failed to delete post");
  }
};

/* ================================
   GET POST REPLIES
================================ */
export const getReplies = async (postId) => {
  const authToken = localStorage.getItem("authToken");
  const url = `${domain}/api/posts/${postId}/replies`;

  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${authToken}` },
  });

  if (!response.ok) {
    throw new Error("Failed to get replies");
  }

  return response.json();
};

/* ================================
   CREATE REPLY
================================ */
export const createReply = async ({ postId, content }) => {
  const authToken = localStorage.getItem("authToken");
  const url = `${domain}/api/posts/${postId}/replies`;

  const formData = new FormData();
  formData.append("content", content);

  const response = await fetch(url, {
    method: "POST",
    headers: { Authorization: `Bearer ${authToken}` },
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to create reply");
  }

  return response.json();
};

/* ================================
   DELETE REPLY
================================ */
export const deleteReply = async (replyId) => {
  const authToken = localStorage.getItem("authToken");
  const url = `${domain}/api/posts/replies/${replyId}`;

  const response = await fetch(url, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${authToken}` },
  });

  if (!response.ok) {
    throw new Error("Failed to delete reply");
  }
};
