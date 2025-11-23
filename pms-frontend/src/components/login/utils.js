const domain = "http://localhost:8080";

/* ================================
   LOGIN
================================ */
export const login = async (credential) => {
  try {
    const loginUrl = `${domain}/auth/login`;

    const response = await fetch(loginUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credential),
    });

    if (!response.ok) {
      console.error("Login failed:", response.status);
      return null;
    }

    return await response.json();
  } catch (err) {
    console.error("Network error during login:", err);
    return null;
  }
};

/* ================================
   REGISTER
================================ */
export const register = async (credential) => {
  try {
    const registerUrl = `${domain}/auth/register`;

    const response = await fetch(registerUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credential),
    });

    if (!response.ok) {
      console.error("Registration failed:", response.status);
      return null;
    }

    return true; // success
  } catch (err) {
    console.error("Network error during registration:", err);
    return null;
  }
};
