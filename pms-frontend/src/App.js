import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import LoginPage, {
  ForgotPasswordModal,
  CreateAccountModal,
  UserProfile,
} from "./components/LoginPage";

import NewsletterDetailPage from "./components/newsletter/NewsletterDetailPage";
import AmenityInfoPage from "./components/amenity/AmenityInfoPage";
import AmenityReservationPage from "./components/amenity/AmenityReservationPage"; // <-- add this

const App = () => {
  const [currentView, setCurrentView] = useState("login");
  const [user, setUser] = useState(null);
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
  const [isCreateAccountOpen, setIsCreateAccountOpen] = useState(false);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    setCurrentView("profile");
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentView("login");
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* Login Page */}
        <Route
          path="/login"
          element={
            <>
              <LoginPage onLoginSuccess={handleLoginSuccess} />

              <ForgotPasswordModal
                isOpen={isForgotPasswordOpen}
                onClose={() => setIsForgotPasswordOpen(false)}
              />

              <CreateAccountModal
                isOpen={isCreateAccountOpen}
                onClose={() => setIsCreateAccountOpen(false)}
              />
            </>
          }
        />

        {/* User Profile */}
        <Route
          path="/profile"
          element={
            user ? (
              <div>
                <UserProfile user={user} />
                <button onClick={handleLogout} className="logout-btn">
                  Logout
                </button>
              </div>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Newsletter detail page */}
        <Route path="/newsletter/:id" element={<NewsletterDetailPage />} />

        {/* Amenity info page */}
        <Route path="/amenity/info" element={<AmenityInfoPage />} />

        {/* Amenity reservation page */}
        <Route path="/amenity/reserve" element={<AmenityReservationPage />} />

        {/* Default redirect */}
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
