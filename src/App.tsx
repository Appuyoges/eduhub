import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { auth, User } from "./firebaseConfig.ts"; // Ensure correct import
import Home from "./pages/Home";
import Chat from "./pages/Chat";
import Events from "./pages/Events";
import StudyGroups from "./pages/StudyGroups";
import Profile from "./pages/Profile";
import Leaderboard from "./pages/Leaderboard";
import VideoConference from "./pages/VideoConference";
import Auth from "./components/Auth";
import Chat1 from "./pages/Chat1";
import Model from "./pages/Model";
import Jobaboard from "./Jobaboard";
import EventRecommendations from "./pages/EventRecommendations";



export default function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null); // ✅ Explicitly set type

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user); // ✅ No more TypeScript error
    });

    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <div className="p-6 bg-secondary min-h-screen">
        <Routes>
          {!currentUser ? (
            <Route path="/*" element={<Auth />} />
          ) : (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/events" element={<Events />} />
              <Route path="/study-groups" element={<StudyGroups />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="/videoconference" element={<VideoConference />} />
              <Route path="/model" element={<Model />} />
              <Route path="/jobaboard" element={<Jobaboard />} />
              <Route path="/chat1" element={<Chat1 />} />
              <Route path="/eventrecommendations" element={<EventRecommendations />} />
              
              <Route path="*" element={<Navigate to="/" />} />
              
            </>
          )}
        </Routes>
      </div>
    </Router>
  );
}
