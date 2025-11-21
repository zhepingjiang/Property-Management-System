const domain = "http://localhost:8080";

/* ================================
   GET ALL POSTS
================================ */
export const getAllPosts = () => {
  const authToken = localStorage.getItem("authToken");
  const url = `${domain}/api/posts`;

  return fetch(url, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  }).then((response) => {
    if (response.status >= 300) {
      throw Error("Fail to get posts");
    }
    return response.json();
  });
};

/* ================================
   GET NEWEST POST
================================ */
export const getNewestPost = () => {
  const authToken = localStorage.getItem("authToken");
  const url = `${domain}/api/posts/newest`;

  return fetch(url, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  }).then((response) => {
    if (response.status >= 300) {
      throw Error("Fail to get newest post");
    }
    return response.json();
  });
};

/* ================================
   GET POST BY ID
================================ */
export const getPostById = (id) => {
  const authToken = localStorage.getItem("authToken");
  const url = `${domain}/api/posts/${id}`;

  return fetch(url, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  }).then((response) => {
    if (response.status >= 300) {
      throw Error("Fail to get post");
    }
    return response.json();
  });
};

/* ================================
   GET POSTS BY AUTHOR
================================ */
export const getPostsByAuthor = (authorId) => {
  const authToken = localStorage.getItem("authToken");
  const url = `${domain}/api/posts/author/${authorId}`;

  return fetch(url, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  }).then((response) => {
    if (response.status >= 300) {
      throw Error("Fail to get author's posts");
    }
    return response.json();
  });
};

/* ================================
   CREATE POST (multipart/form-data)
================================ */
export const createPost = ({ content, images }) => {
  const authToken = localStorage.getItem("authToken");
  const url = `${domain}/api/posts`;

  const formData = new FormData();
  formData.append("content", content);

  if (images && images.length > 0) {
    images.forEach((img) => formData.append("images", img));
  }

  return fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${authToken}`, // ❗ NO Content-Type !!!
    },
    body: formData,
  }).then((response) => {
    if (response.status >= 300) {
      throw Error("Fail to create post");
    }
  });
};

/* ================================
   UPDATE POST STATUS (TRUSTEE ONLY)
================================ */
export const updatePostStatus = (id, status) => {
  const authToken = localStorage.getItem("authToken");
  const url = `${domain}/api/posts/${id}/status`;

  const formData = new FormData();
  formData.append("status", status); // Must match @RequestParam PostStatus status

  return fetch(url, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${authToken}`,
      // DO NOT set Content-Type for FormData
    },
    body: formData,
  }).then((response) => {
    if (response.status >= 300) {
      throw Error("Fail to update post status");
    }
  });
};

/* ================================
   DELETE POST (TRUSTEE ONLY)
================================ */
export const deletePost = (id) => {
  const authToken = localStorage.getItem("authToken");
  const url = `${domain}/api/posts/${id}`;

  return fetch(url, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  }).then((response) => {
    if (response.status >= 300) {
      throw Error("Fail to delete post");
    }
  });
};

/* ================================
   GET ALL REPLIES FOR A POST
================================ */
export const getReplies = (postId) => {
  const authToken = localStorage.getItem("authToken");
  const url = `${domain}/api/posts/${postId}/replies`;

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
   CREATE A REPLY FOR A POST
================================ */
export const createReply = ({ postId, content }) => {
  const authToken = localStorage.getItem("authToken");
  const url = `${domain}/api/posts/${postId}/replies`;

  const formData = new FormData();
  formData.append("content", content);

  return fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${authToken}`, // don't add Content-Type
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
export const deleteReply = (replyId) => {
  const authToken = localStorage.getItem("authToken");
  const url = `${domain}/api/posts/replies/${replyId}`;

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
