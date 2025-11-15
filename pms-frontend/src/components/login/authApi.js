export const fakeLogin = (email, password, role) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (password.length < 6) return reject(new Error("Invalid password"));

      resolve({
        id: Math.random().toString(36).slice(2),
        name: role === "resident" ? "John Resident" : "Jane Faculty",
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
