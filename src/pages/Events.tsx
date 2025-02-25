import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Events.css";
import { signOut } from "firebase/auth"; 
import { auth } from "../firebase"; // Adjust the path if needed



type Event = {
  id: number;
  name: string;
  date: string;
  time: string;
  description: string;
  category: "Ongoing" | "Upcoming";
};

const eventsData: Record<number, Event> = {
    1: { id: 1, name: "AI Hackathon", date: "2025-03-10", time: "10:00 AM", description: "AI coding event", category: "Upcoming" },
    2: { id: 2, name: "Tech Fest", date: "2025-04-15", time: "12:00 PM", description: "Annual tech event", category: "Upcoming" },
    3: { id: 3, name: "Startup Pitch", date: "2025-02-20", time: "02:00 PM", description: "Pitch ideas to investors", category: "Ongoing" },
    4: { id: 4, name: "Cybersecurity Workshop", date: "2025-02-21", time: "11:00 AM", description: "Learn about ethical hacking", category: "Ongoing" },
    5: { id: 5, name: "Robotics Challenge", date: "2025-02-22", time: "03:00 PM", description: "Battle of AI-powered robots", category: "Ongoing" },
    6: { id: 6, name: "Cloud Computing Conference", date: "2025-05-10", time: "09:00 AM", description: "Latest trends in cloud tech", category: "Upcoming" }
  };
  

export default function Events() {
  const navigate = useNavigate();
  const [registeredEvents, setRegisteredEvents] = useState<number[]>([]);

  const handleEventClick = (eventId: number) => {
    navigate(`/events/${eventId}`);
  };

  const handleRegister = (eventId: number) => {
    setRegisteredEvents((prev) => [...prev, eventId]);
    alert("✅ You have successfully registered!");
  };
    const handleLogout = async () => {
      try {
        await signOut(auth);
        navigate("/auth");
      } catch (error) {
        console.error("Logout failed:", error);
      }
    };
  

  return (
    <div className="events-container">
     <nav className="navbar">
        <h2 className="navbar-logo">📚 EduHub</h2>
        <div className="navbar-links">
          <a href="home">💡Home</a>
          <a href="chat">🤖Chat</a>
          <a href="studygroups">🎯StudyGroups</a>
          <a href="events">📅Event</a>
          <a href="games">🎮Games</a>
          <a href="leaderboard">🏆Leaderboard</a>
          <a href="profile">👤Profile</a>
          <button className="logout-button" onClick={handleLogout}>🔒Logout</button>
        </div>
      </nav>

      {/* Page Title */}
      <div className="header">
        <h1>📅 College Events</h1>
        <p>Explore upcoming and ongoing events. Join and participate!</p>
      </div>

      {/* Ongoing Events Section */}
      <section className="event-section">
        <h2 className="section-title">🔥 Ongoing Events</h2>
        <div className="event-list">
          {Object.values(eventsData)
            .filter((event) => event.category === "Ongoing")
            .map((event) => (
              <div key={event.id} className="event-card">
                <h3>{event.name}</h3>
                <p>{event.date} | {event.time}</p>
                <p>{event.description}</p>
                <button className="details-btn" onClick={() => handleEventClick(event.id)}>🔍 View Details</button>
                {!registeredEvents.includes(event.id) && (
                  <button className="register-btn" onClick={() => handleRegister(event.id)}>✅ Register</button>
                )}
              </div>
            ))}
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="event-section">
        <h2 className="section-title">🚀 Upcoming Events</h2>
        <div className="event-list">
          {Object.values(eventsData)
            .filter((event) => event.category === "Upcoming")
            .map((event) => (
              <div key={event.id} className="event-card">
                <h3>{event.name}</h3>
                <p>{event.date} | {event.time}</p>
                <p>{event.description}</p>
                <button className="details-btn" onClick={() => handleEventClick(event.id)}>🔍 View Details</button>
                {!registeredEvents.includes(event.id) && (
                  <button className="register-btn" onClick={() => handleRegister(event.id)}>✅ Register</button>
                )}
              </div>
            ))}
        </div>
      </section>
    </div>
  );
}
