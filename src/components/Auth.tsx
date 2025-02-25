import { useState } from "react";
import { auth, googleProvider } from "../firebaseConfig";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc"; // Google Icon
import "./Auth.css";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState("");
  const [manual, setManual] = useState(false);
  const navigate = useNavigate();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      navigate("/");
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col justify-center items-center bg-white bg-opacity-10 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-full max-w-sm border border-white border-opacity-20"
      >
        <h2 className="text-3xl font-bold text-center text-white drop-shadow-md">
          {isSignUp ? "Create an Account" : "📚EduHub"}
        </h2>

        {error && <p className="text-red-500 text-sm mt-3 text-center">{error}</p>}

        <form onSubmit={handleAuth} className="mt-6 w-full">
          <input
            type="email"
            placeholder="Email Address"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition mb-3 bg-white bg-opacity-20 text-white placeholder-gray-200"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition mb-4 bg-white bg-opacity-20 text-white placeholder-gray-200"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-3 rounded-lg font-semibold shadow-md hover:opacity-90 transition"
          >
            {isSignUp ? "Sign Up" : "Login"}
          </motion.button>
        </form>

        <div className="flex items-center my-4 w-full">
          <div className="w-full h-px bg-gray-300"></div>
          <p className="px-3 text-gray-200 text-sm">OR</p>
          <div className="w-full h-px bg-gray-300"></div>
        </div>

        {!manual ? (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleGoogleSignIn}
            className="w-full bg-white text-gray-800 border border-gray-300 flex items-center justify-center p-3 rounded-lg shadow-md hover:bg-gray-100 transition"
          >
            <FcGoogle className="text-2xl mr-2" /> Sign in with Google
          </motion.button>
        ) : (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => alert("Manual sign-in feature coming soon!")}
            className="w-full bg-gray-200 border border-gray-300 flex items-center justify-center p-3 rounded-lg shadow-md hover:bg-gray-300 transition"
          >
            Manual Sign-in
          </motion.button>
        )}

        <p className="text-center text-sm mt-5 text-gray-200">
          {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
          <span
            className="text-blue-300 font-semibold cursor-pointer hover:underline"
            onClick={() => setIsSignUp(!isSignUp)}
          >
            {isSignUp ? "Login" : "Sign Up"}
          </span>
        </p>

        <p className="text-center text-sm mt-2 text-gray-400 cursor-pointer hover:underline" onClick={() => setManual(!manual)}>
          {manual ? "Use Google Sign-in" : "Use Manual Sign-in"}
        </p>
      </motion.div>
    </div>
  );
}
