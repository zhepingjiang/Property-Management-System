import React from "react";
import "../../css/error/ErrorState.css";

export default function ErrorState({
  title = "Something went wrong",
  message = "",
}) {
  return (
    <div className="error-state-wrapper">
      <div className="error-state-card">
        {/* Pretty triangle warning icon */}
        <div className="error-state-icon">
          <svg
            width="70"
            height="70"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#d08b2e"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path
              fill="#ffe7b3"
              d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"
            />
            <line x1="12" y1="9" x2="12" y2="13" stroke="#7a4a1f" />
            <circle cx="12" cy="17" r="1" fill="#7a4a1f" />
          </svg>
        </div>

        <div className="error-state-title">{title}</div>
        {message && <div className="error-state-message">{message}</div>}
      </div>
    </div>
  );
}
