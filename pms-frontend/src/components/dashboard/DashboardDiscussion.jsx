import React from "react";
import { Card, Typography, Button, Avatar } from "antd";
import { useNavigate } from "react-router-dom";
import { FaComments } from "react-icons/fa";
import "../../css/dashboard/DashboardDiscussion.css";

const { Title, Text } = Typography;

export default function DashboardDiscussion() {
  const navigate = useNavigate();
  const goTo = (path) => () => navigate(path);

  const discussions = [
    {
      title: "Pool Updates",
      lastMsg: "The pool will be closed tomorrow for cleaning.",
      user: "Aiden Smith",
      avatar: "https://i.pravatar.cc/40?img=12",
      path: "/discussion/1",
    },
    {
      title: "Gym Schedule Changes",
      lastMsg: "Morning yoga moved to 7:30 AM.",
      user: "Betty Johnson",
      avatar: "https://i.pravatar.cc/40?img=15",
      path: "/discussion/2",
    },
    {
      title: "Holiday Decorations Ideas",
      lastMsg: "Vote for your favorite decorations before Friday!",
      user: "Cathy Lee",
      avatar: "https://i.pravatar.cc/40?img=8",
      path: "/discussion/3",
    },
    {
      title: "Rooftop Party Feedback",
      lastMsg: "The rooftop event was amazing!",
      user: "Dylan Brown",
      avatar: "https://i.pravatar.cc/40?img=32",
      path: "/discussion/4",
    },
    {
      title: "New Cafe Menu",
      lastMsg: "Try the new seasonal drinks!",
      user: "Eva Green",
      avatar: "https://i.pravatar.cc/40?img=16",
      path: "/discussion/5",
    },
    {
      title: "Parking Lot Notices",
      lastMsg: "Maintenance scheduled on Saturday.",
      user: "Fiona White",
      avatar: "https://i.pravatar.cc/40?img=21",
      path: "/discussion/6",
    },
  ];

  return (
    <section className="discussion-section">
      <Title level={4} className="discussion-title">
        Discussions
      </Title>

      <div className="discussion-row">
        {discussions.map((d, i) => (
          <Card
            key={i}
            hoverable
            className="discussion-card hotel-card clickable-card"
            onClick={goTo("/discussion")}
          >
            <div className="discussion-icon">
              <FaComments />
            </div>
            <div className="discussion-info">
              <div className="discussion-title-card">{d.title}</div>
              <div className="discussion-last-msg">{d.lastMsg}</div>
              <div className="discussion-meta">
                <Avatar size={28} src={d.avatar} />
                <Text className="discussion-user">{d.user}</Text>
              </div>
              <Button
                className="discussion-btn"
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  goTo("/discussion")();
                }}
              >
                View Discussion
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
