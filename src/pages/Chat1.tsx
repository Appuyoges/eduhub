import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPaperPlane, FaFileUpload, FaUser, FaRobot, FaSun, FaMoon } from "react-icons/fa";
import { GoogleGenerativeAI } from "@google/generative-ai";
import "./Chat.css";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import ElfsightJobBoard from "./ElfsightChat.tsx";

const API_KEY = "AIzaSyBwOxFH0lSONfagupM6OIWcDMn9473ITII";
const genAI = new GoogleGenerativeAI(API_KEY);

const Chatbot = () => {
  const [messages, setMessages] = useState<{ text: string; sender: string; timestamp: string }[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const fetchAIResponse = async (userInput: string) => {
    setIsTyping(true);
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const response = await model.generateContent(userInput);
      const text = response.response.text();
      const timestamp = new Date().toLocaleTimeString();
      setMessages((prev) => [...prev, { text, sender: "bot", timestamp }]);
    } catch (error) {
      const timestamp = new Date().toLocaleTimeString();
      setMessages((prev) => [...prev, { text: "Error fetching response", sender: "bot", timestamp }]);
    } finally {
      setIsTyping(false);
    }
  };
  useEffect(() => {
    if (file) {
      console.log("Uploaded file:", file.name);
    }
  }, [file]); // This will log when a file is uploaded
  
  const handleSend = () => {
    if (!input.trim()) return;
    const timestamp = new Date().toLocaleTimeString();
    setMessages((prev) => [...prev, { text: input, sender: "user", timestamp }]);
    fetchAIResponse(input);
    setInput("");
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0];
    if (!uploadedFile) return;

    setFile(uploadedFile);
    setIsTyping(true);

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const fileContent = await uploadedFile.text();
      const prompt = `Summarize the following document:\n\n${fileContent}`;
      const response = await model.generateContent(prompt);
      const summary = response.response.text();
      const timestamp = new Date().toLocaleTimeString();
      setMessages((prev) => [...prev, { text: `Document Summary:\n${summary}`, sender: "bot", timestamp }]);
    } catch (error) {
      const timestamp = new Date().toLocaleTimeString();
      setMessages((prev) => [...prev, { text: "Error summarizing document", sender: "bot", timestamp }]);
    } finally {
      setIsTyping(false);
    }
  };

  const auth = getAuth(); // Initialize Firebase Auth
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/auth"); // Redirect user after logout
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <div className={`flex flex-col items-center w-full min-h-screen ${theme === "light" ? "bg-gradient-to-br from-blue-50 to-purple-50" : "bg-gradient-to-br from-gray-900 to-gray-800"}`}>
      {/* 🏠 Navbar Section */}
      <nav className={`navbar w-full ${theme === "light" ? "bg-white bg-opacity-20" : "bg-gray-800 bg-opacity-50"} backdrop-blur-md text-white py-4 px-6 flex justify-between items-center shadow-lg`}>
        <h2 className="navbar-logo text-3xl font-extrabold">📚 EduHub</h2>
        <div className="navbar-links flex gap-5 items-center">
          <a href="home" className="hover:text-yellow-300 transition-all">💡 Home</a>
          <a href="chat" className="hover:text-yellow-300 transition-all">🤖 Chat</a>
          <a href="studygroups" className="hover:text-yellow-300 transition-all">🎯 Study Groups</a>
          <a href="events" className="hover:text-yellow-300 transition-all">📅 Events</a>
          <a href="games" className="hover:text-yellow-300 transition-all">🎮 Games</a>
          <a href="leaderboard" className="hover:text-yellow-300 transition-all">🏆 Leaderboard</a>
          <a href="profile" className="hover:text-yellow-300 transition-all">👤 Profile</a>
          <a href="Jobaboard" className="hover:text-yellow-300 transition-all">💼 Job Offers</a>
          <button
            onClick={toggleTheme}
            className="p-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full shadow-lg hover:opacity-80 transition-all"
          >
            {theme === "light" ? <FaMoon size={20} /> : <FaSun size={20} />}
          </button>
          <button
            className="logout-button bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 transition-all"
            onClick={handleLogout}
          >
            🔒 Logout
          </button>
        </div>
      </nav>

      {/* 💬 Chatbot Section */}
      <div className={`flex flex-col w-full max-w-lg ${theme === "light" ? "bg-white" : "bg-gray-700"} shadow-xl rounded-2xl p-5 mt-6 border ${theme === "light" ? "border-gray-200" : "border-gray-600"} h-[550px] overflow-hidden`}>
        <div className="flex-1 overflow-y-auto p-3 space-y-3">
          <AnimatePresence>
            {messages.map((msg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: msg.sender === "user" ? 50 : -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className={`p-3 max-w-xs rounded-lg ${theme === "light" ? "text-white" : "text-gray-100"} ${
                  msg.sender === "user"
                    ? "bg-gradient-to-r from-blue-500 to-indigo-500 self-end shadow-lg"
                    : "bg-gray-800 self-start shadow-lg"
                }`}
              >
                <div className="flex items-center gap-2">
                  {msg.sender === "user" ? <FaUser size={16} /> : <FaRobot size={16} />}
                  <span className="text-sm font-semibold">{msg.sender === "user" ? "You" : "Bot"}</span>
                </div>
                <p className="mt-1">{msg.text}</p>
                <span className="text-xs text-gray-300 block mt-1">{msg.timestamp}</span>
              </motion.div>
            ))}
          </AnimatePresence>
          {isTyping && (
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
            </div>
          )}
          <div ref={chatRef}></div>
        </div>

        {/* ✍️ Input Box */}
        <div className={`flex items-center border-t p-3 ${theme === "light" ? "bg-gray-100" : "bg-gray-600"} rounded-b-2xl`}>
          <label htmlFor="file-upload" className="p-3 bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-full shadow-lg hover:opacity-80 transition-all cursor-pointer">
            <FaFileUpload size={20} />
          </label>
          <input
            id="file-upload"
            type="file"
            accept=".txt,.pdf,.docx"
            onChange={handleFileUpload}
            className="hidden"
          />
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            className={`flex-1 p-3 border ${theme === "light" ? "border-gray-300" : "border-gray-500"} rounded-l-full focus:outline-none shadow-md ${theme === "light" ? "bg-white" : "bg-gray-700 text-white"}`}
          />
          <button
            onClick={handleSend}
            className="p-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full shadow-lg hover:opacity-80 transition-all"
          >
            <FaPaperPlane size={20} />
          </button>
        </div>
      </div>
    </div>
  );


  function App() {
    return (
      <div>
        <h1>Job Board</h1>
        <ElfsightJobBoard />
      </div>
    );
  }
  
  


};

export default Chatbot;   