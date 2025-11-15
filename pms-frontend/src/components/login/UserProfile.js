import React from "react";

export default function UserProfile({ user, onLogout }) {
  return (
    <div className="user-profile">
      <h2>Welcome, {user.name}</h2>
      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>
      {user.unit && <p>Unit: {user.unit}</p>}
      <button onClick={onLogout}>Logout</button>
    </div>
  );
}
