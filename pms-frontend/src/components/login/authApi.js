export const fakeLogin = (email, password, role) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (password.length < 6) return reject(new Error("Invalid password"));

      // derive a friendly display name from the email local part when possible
      let displayName = "";
      if (email && typeof email === "string" && email.includes("@")) {
        const local = email.split("@")[0];
        // replace separators with spaces, then capitalize words
        displayName = local
          .replace(/[._\-]+/g, " ")
          .split(/\s+/)
          .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
          .join(" ");
      }

      // fallback names if no email provided
      if (!displayName) {
        displayName = role === "resident" ? "Resident User" : "Faculty User";
      }

      resolve({
        id: Math.random().toString(36).slice(2),
        name: displayName,
        email,
        role,
        unit: role === "resident" ? "A-101" : "Faculty Wing",
      });
    }, 1000);
  });

export const fakeCreateAccount = (form) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: Math.random().toString(36).slice(2),
        name: form.name,
        email: form.email,
        role: form.role,
      });
    }, 1000);
  });
