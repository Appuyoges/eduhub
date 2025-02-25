// import React, { useState } from "react";
// import { auth } from "../firebase"; // Import Firebase auth
// import { createUserWithEmailAndPassword } from "firebase/auth";
// import "./Login.css";

// export default function Signup() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   const handleSignup = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       await createUserWithEmailAndPassword(auth, email, password);
//       alert("Account created successfully! ✅");
//     } catch (err) {
//       setError("Error creating account!");
//     }
//   };

//   return (
//     <div className="login-container">
//       <div className="login-box">
//         <h2 className="login-title">📝 Sign Up</h2>
//         <form onSubmit={handleSignup}>
//           <div className="input-group">
//             <label>Email</label>
//             <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
//           </div>
//           <div className="input-group">
//             <label>Password</label>
//             <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
//           </div>
//           {error && <p className="error-text">{error}</p>}
//           <button className="login-button" type="submit">Sign Up</button>
//         </form>
//         <p className="signup-link">Already have an account? <a href="/login">Login</a></p>
//       </div>
//     </div>
//   );
// }
