export const validateLogin = (username, password) => {
  const errors = {};

  if (!username) errors.email = "Username required";
  if (!password) errors.password = "Password required";

  return { ok: Object.keys(errors).length === 0, errors };
};

export const validateCreateAccount = (form) => {
  const errors = {};
  if (!form.username) errors.name = "Name required";

  if (!/\S+@\S+\.\S+/.test(form.email)) errors.email = "Invalid email";

  if (form.password.length < 6) errors.password = "Password must be 6+ chars";

  if (form.password !== form.confirmPassword)
    errors.confirmPassword = "Passwords do not match";

  return { ok: Object.keys(errors).length === 0, errors };
};
