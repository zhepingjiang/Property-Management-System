import React from "react";
import {
  Layout,
  Typography,
  Row,
  Col,
  Card,
  Button,
  Avatar,
  Space,
  Tag,
} from "antd";
import { useNavigate } from "react-router-dom";
import "../../css/dashboard/DashboardLayout.css";
import DashboardHeader from "./DashboardHeader";

const { Content, Footer } = Layout;
const { Title, Text } = Typography;

export default function DashboardLayout({ children, pageTitle, user }) {
  const navigate = useNavigate();

  const goTo = (path) => () => navigate(path);

  const trendingEvents = [
    {
      title: "Community BBQ Night",
      date: "Nov 22",
      location: "Central Lawn",
      desc: "Food, music & family fun.",
    },
    {
      title: "Yoga Morning",
      date: "Nov 28",
      location: "Rooftop Garden",
      desc: "Gentle flow for all levels.",
    },
    {
      title: "Holiday Fair",
      date: "Dec 10",
      location: "Lobby",
      desc: "Local vendors & crafts.",
    },
  ];

  return (
    <Layout className="dashboard-layout">
      {/* Header moved to DashboardHeader component */}
      <DashboardHeader pageTitle={pageTitle} user={user} />

      {/* Content */}
      <Content className="dashboard-content">
        {children ? (
          // render the provided page inside the dashboard content area
          children
        ) : (
          // default dashboard content when no child page is provided
          <>
            {/* Newsletter Banner (click -> newsletter detail) */}
            <Card
              className="newsletter-banner hotel-card clickable-card"
              onClick={goTo("/newsletter/1")}
            >
              <Text className="newsletter-text hotel-text">
                Newsletter section to send out updates regarding the community,
                living environment, and policies.
              </Text>
            </Card>

            {/* Trending Events */}
            <section className="section">
              <Title level={4} className="hotel-title">
                Trending Events
              </Title>
              <Row gutter={16}>
                {trendingEvents.map((ev, i) => (
                  <Col xs={24} sm={8} key={i}>
                    <Card
                      hoverable
                      className="box-card hotel-card clickable-card"
                      onClick={goTo("/amenity/info")}
                    >
                      <div
                        className="card-body"
                        style={{ display: "flex", gap: 12 }}
                      >
                        <Avatar
                          size={52}
                          style={{ backgroundColor: "#e2d5c2" }}
                        >
                          {ev.title.charAt(0)}
                        </Avatar>
                        <div style={{ flex: 1 }}>
                          <div className="card-title">{ev.title}</div>
                          <div className="card-sub">
                            {ev.date} • {ev.location}
                          </div>
                          <div style={{ marginTop: 8, color: "#6b5a45" }}>
                            {ev.desc}
                          </div>
                          <div style={{ marginTop: 10 }}>
                            <Button
                              size="small"
                              type="primary"
                              onClick={(e) => {
                                e.stopPropagation();
                                goTo("/events")();
                              }}
                            >
                              View
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </Col>
                ))}
              </Row>
            </section>

            {/* Current Balance */}
            <section className="section">
              <Title level={4} className="hotel-title">
                Current Balance
              </Title>
              <Row gutter={16}>
                <Col xs={24} sm={16}>
                  <Card
                    hoverable
                    className="box-card hotel-card balance-card clickable-card"
                    onClick={goTo("/profile")}
                  >
                    <div className="card-body">
                      <div className="card-title">Current Balance</div>
                      <div style={{ fontSize: "1.6rem", fontWeight: 700 }}>
                        $1,250
                      </div>
                      <div style={{ marginTop: 8 }}>
                        <Tag color="gold">Due Dec 05</Tag>
                        <span style={{ marginLeft: 8, color: "#7a6a55" }}>
                          1 invoice pending
                        </span>
                      </div>
                    </div>
                  </Card>
                </Col>
                <Col xs={24} sm={8}>
                  <Card
                    hoverable
                    className="box-card hotel-card events-card clickable-card"
                    onClick={goTo("/amenity/info")}
                  >
                    <div className="card-body">
                      <div className="card-title">Notifications</div>
                      <div className="card-sub">3 new</div>
                      <div style={{ marginTop: 8 }}>
                        <Button
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation();
                            goTo("/notifications")();
                          }}
                        >
                          View
                        </Button>
                      </div>
                    </div>
                  </Card>
                </Col>
              </Row>
            </section>

            {/* Amenities Reserve */}
            <section className="section">
              <Title level={4} className="hotel-title">
                Amenities Reserve
              </Title>
              <Row gutter={16}>
                <Col xs={24} sm={8}>
                  <Card hoverable className="box-card hotel-card survey-card">
                    <div className="card-body">
                      <div className="card-title">Quick Survey</div>
                      <div className="card-sub">
                        Tell us about the new gym hours
                      </div>
                      <div style={{ marginTop: 8 }}>
                        <Button
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation();
                            goTo("/survey/1")();
                          }}
                        >
                          Take Survey
                        </Button>
                      </div>
                    </div>
                  </Card>
                </Col>
                <Col xs={24} sm={16}>
                  <Card hoverable className="box-card hotel-card survey-card">
                    <div className="card-body">
                      <div className="card-title">Community Vote</div>
                      <div className="card-sub">
                        Help choose holiday decorations
                      </div>
                      <div style={{ marginTop: 8 }}>
                        <Button
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation();
                            goTo("/survey/2")();
                          }}
                        >
                          Vote Now
                        </Button>
                      </div>
                    </div>
                  </Card>
                </Col>
              </Row>

              <Card
                hoverable
                className="small-card-wide hotel-card clickable-card"
                onClick={goTo("/amenity/info")}
              >
                <div className="card-body">
                  <div className="card-title">Pool & Rooftop</div>
                  <div className="card-sub">
                    Swim, relax, and enjoy city views
                  </div>
                  <div style={{ marginTop: 8 }}>
                    <Button
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        goTo("/amenity/info")();
                      }}
                    >
                      See Details
                    </Button>
                  </div>
                </div>
              </Card>
            </section>

            {/* Useful Links */}
            <section className="section">
              <Title level={4} className="hotel-title">
                Useful Links
              </Title>
              <Row gutter={16}>
                {[
                  {
                    title: "Resident Portal",
                    sub: "Account & payments",
                    href: "https://learning.laioffer.com/",
                  },
                  {
                    title: "Policies",
                    sub: "Community rules",
                    href: "https://learning.laioffer.com/",
                  },
                  {
                    title: "Local Services",
                    sub: "Recommended vendors",
                    href: "https://learning.laioffer.com/",
                  },
                  {
                    title: "Help Center",
                    sub: "FAQs & support",
                    href: "https://learning.laioffer.com/",
                  },
                ].map((link, idx) => (
                  <Col xs={12} sm={6} key={idx}>
                    <Card
                      hoverable
                      className="link-card hotel-card"
                      onClick={() => window.open(link.href, "_blank")}
                      style={{ cursor: "pointer" }}
                    >
                      <div className="card-body">
                        <div className="card-title">{link.title}</div>
                        <div className="card-sub">{link.sub}</div>
                      </div>
                    </Card>
                  </Col>
                ))}
              </Row>

              <Card
                hoverable
                className="mid-card hotel-card clickable-card"
                onClick={goTo("/amenity/reserve")}
              >
                <div className="card-body">
                  <div className="card-title">Reserve an Amenity</div>
                  <div className="card-sub">Check availability & book</div>
                </div>
              </Card>
            </section>
          </>
        )}
      </Content>

      {/* Footer */}
      <Footer className="dashboard-footer hotel-footer">
        <Text className="info-text hotel-text-secondary">
          Address: ### abcded St, City, Country
          <br />
          Biz Service Office Hour: 9:00 AM - 6:00 PM
        </Text>

        <Text className="info-text hotel-text-secondary">
          © 2025 Privacy & Policy. View our Accessibility
        </Text>
      </Footer>
    </Layout>
  );
}
