// import React, { useState } from "react";
// import { auth } from "../firebase"; // Firebase Authentication
// import { signInWithEmailAndPassword } from "firebase/auth";
// import "./Login.css";

// export default function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [welcomeMessage, setWelcomeMessage] = useState("");

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError(""); // Clear previous errors
//     setWelcomeMessage(""); // Clear previous messages

//     try {
//       const userCredential = await signInWithEmailAndPassword(auth, email, password);
//       const user = userCredential.user;

//       setWelcomeMessage(`🎉 Welcome back, ${user.displayName || "Student"}! 🚀`); // Display welcome message

//       setTimeout(() => {
//         window.location.href = "/dashboard"; // Redirect after 2 seconds
//       }, 2000);
//     } catch (err) {
//       setError("❌ Invalid email or password!");
//     }
//   };

//   return (
//     <div className="login-container">
//       <div className="login-box">
//         <h2 className="login-title">🔑 Login</h2>
        
//         {welcomeMessage && <p className="welcome-text">{welcomeMessage}</p>} {/* Welcome message */}

//         <form onSubmit={handleLogin}>
//           <div className="input-group">
//             <label>Email</label>
//             <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
//           </div>
//           <div className="input-group">
//             <label>Password</label>
//             <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
//           </div>

//           {error && <p className="error-text">{error}</p>} {/* Error Message */}
          
//           <button className="login-button" type="submit">Login</button>
//         </form>

//         <p className="signup-link">Don't have an account? <a href="/signup">Sign Up</a></p>
//       </div>
//     </div>
//   );
// }
