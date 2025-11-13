import React from "react";
import "../css/ResidentDashboard.css";

const ResidentDashboard = ({ user, onLogout }) => {
  // Sample data based on the new content
  const dashboardData = {
    tendingEvents: [
      {
        id: 1,
        title: "Community Meeting",
        date: "2024-01-15",
        attendees: "25 residents",
      },
      {
        id: 2,
        title: "Yoga Class",
        date: "2024-01-16",
        attendees: "18 residents",
      },
      {
        id: 3,
        title: "Maintenance Day",
        date: "2024-01-18",
        attendees: "12 residents",
      },
    ],
    currentBalance: 1250.75,
    amenities: [
      {
        id: 1,
        name: "Swimming Pool",
        status: "Available",
        time: "9 AM - 8 PM",
      },
      { id: 2, name: "Tennis Court", status: "Reserved", time: "2 PM - 4 PM" },
      { id: 3, name: "Clubhouse", status: "Available", time: "All Day" },
      { id: 4, name: "Gym", status: "Maintenance", time: "Closed Today" },
    ],
    usefulLinks: [
      { name: "Community Guidelines", icon: "📋" },
      { name: "Maintenance Request", icon: "🔧" },
      { name: "Payment Portal", icon: "💳" },
      { name: "Contact Management", icon: "👥" },
    ],
    residentInfo: {
      names: "Adrian, woman, sonor, woman, woman",
      award: "% women with their name: award",
      role: "Will Always bring you the role of a secretary",
    },
  };

  return (
    <div className="resident-dashboard">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-content">
          <h1 className="dashboard-title">Resident Dashboard</h1>
          <div className="user-actions">
            <span className="welcome-text">
              Welcome, {user?.name || "Resident"}
            </span>
            <button className="logout-btn" onClick={onLogout}>
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="dashboard-main">
        {/* Top Stats Row */}
        <div className="stats-row">
          <div className="stat-card">
            <div className="stat-icon">📅</div>
            <div className="stat-content">
              <h3>Tending Events</h3>
              <div className="stat-value">
                {dashboardData.tendingEvents.length}
              </div>
              <div className="stat-label">Active Events</div>
            </div>
          </div>

          <div className="stat-card highlight">
            <div className="stat-icon">💰</div>
            <div className="stat-content">
              <h3>Current Balance</h3>
              <div className="stat-value">${dashboardData.currentBalance}</div>
              <div className="stat-label">Outstanding Amount</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">🏊</div>
            <div className="stat-content">
              <h3>Amenities Reserve</h3>
              <div className="stat-value">
                {
                  dashboardData.amenities.filter(
                    (a) => a.status === "Available"
                  ).length
                }
              </div>
              <div className="stat-label">Available Now</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">🔗</div>
            <div className="stat-content">
              <h3>Useful Links</h3>
              <div className="stat-value">
                {dashboardData.usefulLinks.length}
              </div>
              <div className="stat-label">Quick Access</div>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="content-grid">
          {/* Left Column - Tending Events */}
          <section className="content-card events-section">
            <div className="card-header">
              <h2>📅 Tending Events</h2>
              <span className="card-badge">
                {dashboardData.tendingEvents.length} events
              </span>
            </div>
            <div className="events-list">
              {dashboardData.tendingEvents.map((event) => (
                <div key={event.id} className="event-item">
                  <div className="event-main">
                    <h4 className="event-title">{event.title}</h4>
                    <span className="event-date">{event.date}</span>
                  </div>
                  <div className="event-meta">
                    <span className="event-attendees">{event.attendees}</span>
                    <button className="event-action">View Details</button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Middle Column - Amenities & Useful Links */}
          <div className="middle-column">
            {/* Amenities Reserve */}
            <section className="content-card amenities-section">
              <div className="card-header">
                <h2>🏊 Amenities Reserve</h2>
                <span className="card-badge">Reserve Now</span>
              </div>
              <div className="amenities-grid">
                {dashboardData.amenities.map((amenity) => (
                  <div key={amenity.id} className="amenity-item">
                    <div className="amenity-icon">
                      {amenity.name.includes("Pool")
                        ? "🏊"
                        : amenity.name.includes("Tennis")
                        ? "🎾"
                        : amenity.name.includes("Club")
                        ? "🏛️"
                        : "💪"}
                    </div>
                    <div className="amenity-info">
                      <h4>{amenity.name}</h4>
                      <span
                        className={`amenity-status ${amenity.status.toLowerCase()}`}
                      >
                        {amenity.status}
                      </span>
                      <span className="amenity-time">{amenity.time}</span>
                    </div>
                    <button
                      className={`reserve-btn ${
                        amenity.status === "Available" ? "active" : "disabled"
                      }`}
                      disabled={amenity.status !== "Available"}
                    >
                      {amenity.status === "Available"
                        ? "Reserve"
                        : "Unavailable"}
                    </button>
                  </div>
                ))}
              </div>
            </section>

            {/* Useful Links */}
            <section className="content-card links-section">
              <div className="card-header">
                <h2>🔗 Useful Links</h2>
              </div>
              <div className="links-grid">
                {dashboardData.usefulLinks.map((link, index) => (
                  <a key={index} href="#" className="link-item">
                    <span className="link-icon">{link.icon}</span>
                    <span className="link-text">{link.name}</span>
                  </a>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column - Resident Information */}
          <section className="content-card info-section">
            <div className="card-header">
              <h2>👥 Resident Information</h2>
            </div>
            <div className="info-content">
              <div className="names-section">
                <h3>Resident Names</h3>
                <p className="names-list">{dashboardData.residentInfo.names}</p>
              </div>

              <div className="award-section">
                <h3>Award Recognition</h3>
                <div className="award-badge">
                  <span className="award-percentage">
                    {dashboardData.residentInfo.award.split(":")[0]}
                  </span>
                  <span className="award-text">
                    {dashboardData.residentInfo.award.split(":")[1]}
                  </span>
                </div>
              </div>

              <div className="role-section">
                <h3>Role Assignment</h3>
                <div className="role-card">
                  <div className="role-icon">📝</div>
                  <div className="role-content">
                    <p className="role-statement">
                      {dashboardData.residentInfo.role}
                    </p>
                    <span className="role-badge">Secretary Role</span>
                  </div>
                </div>
              </div>

              <div className="contact-section">
                <h3>Quick Actions</h3>
                <div className="action-buttons">
                  <button className="action-btn primary">
                    Contact Management
                  </button>
                  <button className="action-btn secondary">
                    Update Profile
                  </button>
                  <button className="action-btn outline">View Documents</button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default ResidentDashboard;
