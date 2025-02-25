import { useState } from "react";
import { Line } from "react-chartjs-2";
import { motion } from "framer-motion";
import "chart.js/auto";
import "./Leaderboard.css";

export default function Profile() {
  const [user] = useState({
    name: "John Doe",
    role: "AI Enthusiast | ML Engineer",
    achievements: ["Top Performer", "Problem Solver"],
    personalRecords: [
      "Published 3 research papers",
      "Winner of AI Hackathon 2023",
      "Developed an ML Model with 98% accuracy",
    ],
  });

  const academicData = {
    labels: ["Semester 1", "Semester 2", "Semester 3", "Semester 4"],
    datasets: [
      {
        label: "Academic Progress",
        data: [3.2, 3.5, 3.7, 3.9],
        fill: false,
        borderColor: "#4CAF50",
        tension: 0.4,
      },
    ],
  };

  const sportsData = {
    labels: ["2019", "2020", "2021", "2022"],
    datasets: [
      {
        label: "Sports Performance",
        data: [50, 70, 85, 95],
        fill: false,
        borderColor: "#2196F3",
        tension: 0.4,
      },
    ],
  };

  const extracurricularData = {
    labels: ["2019", "2020", "2021", "2022"],
    datasets: [
      {
        label: "Extracurricular Activities",
        data: [2, 4, 6, 8],
        fill: false,
        borderColor: "#FFC107",
        tension: 0.4,
      },
    ],
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/auth");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleVideoConference = () => {
    navigate("/videoConference");
  };

  return (
    <>
      {/* Navbar */}
      <nav className="navbar">
        <h2 className="navbar-logo">📚 EduHub</h2>
        <div className="navbar-links">
          <a href="home">💡Home</a>
          <a href="chat1">🤖Chat</a>
          <a href="studygroups">🎯StudyGroups</a>
          <a href="events">📅Event</a>
          <a href="games">🎮Games</a>
          <a href="leaderboard">🏆Leaderboard</a>
          <a href="profile">👤Profile</a>
          <button className="video-conference-button" onClick={handleVideoConference}>
            📹 Video Conference
          </button>
          <button className="logout-button" onClick={handleLogout}>🔒Logout</button>
        </div>
      </nav>

      {/* Profile Section */}
      <motion.div className="profile-container">
        <div className="profile-content">
          <motion.h2 className="profile-title">👤 Leaderboard</motion.h2>

          <motion.div className="profile-highlight">
            <h3>🌟 Top Performer of the Institution</h3>
            <p>Congratulations, John Doe! Recognized as the best performer in AI & ML for 2024.</p>
          </motion.div>

          <motion.div className="profile-section">
            <h3>🏆 Top 3 Performers</h3>
            {["Academics", "Sports", "Extracurricular Activities"].map((category, index) => (
              <div key={index}>
                <h4>{category}</h4>
                <ul>
                  <li>Alice Smith - {category === "Academics" ? "CGPA 3.95" : "Champion"}</li>
                  <li>John Doe - {category === "Academics" ? "CGPA 3.90" : "Runner-up"}</li>
                  <li>Michael Brown - {category === "Academics" ? "CGPA 3.85" : "Finalist"}</li>
                </ul>
              </div>
            ))}
          </motion.div>

          <motion.div className="profile-card">
            <h3>🏅 {user.name}</h3>
            <p>{user.role}</p>
            <div className="profile-badges">
              {user.achievements.map((badge, index) => (
                <motion.span key={index} className="badge">{badge}</motion.span>
              ))}
            </div>
          </motion.div>

          {[academicData, sportsData, extracurricularData].map((data, index) => (
            <motion.div key={index} className="profile-chart">
              <h3>{data.datasets[0].label}</h3>
              <Line data={data} />
            </motion.div>
          ))}

          <motion.div className="profile-section">
            <h3>🏅 Personal Achievements & Records</h3>
            <p>View your achievements and progress.</p>
            <ul>
              {user.personalRecords.map((record, index) => (
                <li key={index}>{record}</li>
              ))}
            </ul>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
}