import { auth } from "../firebaseConfig"; 
import { signOut } from "firebase/auth"; 
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { motion } from "framer-motion";
import "./Home.css";

const getCurrentDateTime = () => {
  return new Date().toLocaleString();
};

export default function Home() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/auth");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };


  const handleVideoConference = () => {
    navigate("/videoConference"); // Redirect to the Agora SDK page
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };
 

  return (
    <>
      {/* Navbar */}
      <nav className="navbar">
        <h2 className="navbar-logo">📚 EduHub</h2>
        <div className="navbar-links">
          <a href="home">💡Home</a>
          <a href="chat1">🤖Chat</a>
          <a href="model">🎯StudyGroups</a>
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



      {/* Hero Section */}
      <h1 className="home-title">📚 EduHub</h1>
      <p className="home-text">Engage, Learn, and Grow with AI-powered tools.</p>
      <p>Current Date & Time: {getCurrentDateTime()}</p>

      {/* Animated Slider */}
      <div className="slider-container mx-auto max-w-4xl">
        <Slider {...settings}>  
          <div className="slider-item">
            <img src="src/images/study-group.jpg" alt="Study Groups" className="rounded-lg w-full" />
            <h3 className="slider-caption">Study Groups</h3>
          </div>
          <div className="slider-item">
            <img src="src/images/events.jpg" alt="Events" className="rounded-lg w-full" />
            <h3 className="slider-caption">Events</h3>
          </div>
          <div className="slider-item">
            <img src="src/images/leaderboard.jpg" alt="Leaderboard" className="rounded-lg w-full" />
            <h3 className="slider-caption">Leaderboard</h3>
          </div>
          <div className="slider-item">
            <img src="src/images/gaming.jpg" alt="Educational Games" className="rounded-lg w-full" />
            <h3 className="slider-caption">Educational Games</h3>
          </div>
        </Slider>
      </div>
      <div className="mt-12 p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-gray-800">✨ Unique Features</h2>
        <ul className="list-disc pl-6 text-gray-700 mt-4 space-y-2">
          <li>💬 Live Chat for Group Members</li>
          <li>🔥 Trending Groups Highlighted</li>
          <li>🔍 Search & Filter Functionality</li>
          <li>📌 Personalized Recommendations</li>
        </ul>
      </div>
    </>
    
  );
}
