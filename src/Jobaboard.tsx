import React from "react";
import { motion } from "framer-motion";

export default function JobBoard() {
  return (
    <div style={{ fontFamily: "Arial, sans-serif", textAlign: "center", backgroundColor: "#f4ebd1", minHeight: "100vh", padding: "20px" }}>
      <motion.h1 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ fontSize: "2rem", color: "#031925", marginBottom: "20px" }}
      >
        Welcome to Our Job Board
      </motion.h1>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        style={{ backgroundColor: "#fff", padding: "20px", borderRadius: "10px", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" }}
      >
        <script src="https://static.elfsight.com/platform/platform.js" async></script>
        <div className="elfsight-app-5fc8bc78-a610-41bf-8f12-931782e034b2" data-elfsight-app-lazy></div>
      </motion.div>
    </div>
  );
}
