import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import LoginPage from "./components/login/LoginPage";
import ForgotPasswordModal from "./components/login/ForgotPasswordModal";
import CreateAccountModal from "./components/login/CreateAccountModal";
import UserProfile from "./components/login/UserProfile";
import DashboardLayout from "./components/DashboardLayout";

import NewsletterDetailPage from "./components/newsletter/NewsletterDetailPage";
import AmenityInfoPage from "./components/amenity/AmenityInfoPage";
import AmenityReservationPage from "./components/amenity/AmenityReservationPage";

const App = () => {
  const [user, setUser] = useState(null);
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
  const [isCreateAccountOpen, setIsCreateAccountOpen] = useState(false);

  const handleLoginSuccess = (userData) => {
    console.log("Login successful:", userData);
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* Login Page */}
        <Route
          path="/login"
          element={
            <>
              <LoginPage
                onLoginSuccess={handleLoginSuccess}
                onForgotPassword={() => setIsForgotPasswordOpen(true)}
                onCreateAccount={() => setIsCreateAccountOpen(true)}
              />

              <ForgotPasswordModal
                isOpen={isForgotPasswordOpen}
                onClose={() => setIsForgotPasswordOpen(false)}
              />

              <CreateAccountModal
                isOpen={isCreateAccountOpen}
                onClose={() => setIsCreateAccountOpen(false)}
                onAccountCreated={handleLoginSuccess}
              />
            </>
          }
        />

        {/* Profile Page */}
        <Route
          path="/profile"
          element={
            user ? (
              <div className="profile-container">
                <UserProfile user={user} onLogout={handleLogout} />
              </div>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Dashboard Page (still optional) */}
        <Route
          path="/dashboard"
          element={
            user ? <DashboardLayout /> : <Navigate to="/login" replace />
          }
        />

        {/* Amenity Pages */}
        <Route path="/amenity/info" element={<AmenityInfoPage />} />
        <Route path="/amenity/reserve" element={<AmenityReservationPage />} />

        {/* Newsletter Page */}
        <Route path="/newsletter/:id" element={<NewsletterDetailPage />} />

        {/* Default Route */}
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
