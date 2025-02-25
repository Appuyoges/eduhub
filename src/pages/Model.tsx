import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

interface StudentResponse {
  group: number;
  strength: string;
  weakness: string;
}

export default function model() {
  const [rollNumber, setRollNumber] = useState<string>("");
  const [mathScore, setMathScore] = useState<string>("");
  const [readingScore, setReadingScore] = useState<string>("");
  const [writingScore, setWritingScore] = useState<string>("");
  const [result, setResult] = useState<StudentResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post<StudentResponse>("http://localhost:5000/assign", {
        rollNumber: parseInt(rollNumber),
        mathScore: parseFloat(mathScore),
        readingScore: parseFloat(readingScore),
        writingScore: parseFloat(writingScore),
      });
      setResult(response.data);
    } catch (error) {
      setError("Failed to assign student. Please try again.");
      console.error("Error assigning student:", error);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      style={{ maxWidth: "400px", margin: "50px auto", padding: "20px", backgroundColor: "#fff", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", borderRadius: "10px" }}
    >
      <h2 style={{ textAlign: "center", color: "#2563EB" }}>Assign Student to Group</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <input type="number" placeholder="Roll Number" value={rollNumber} onChange={(e) => setRollNumber(e.target.value)} required />
        <input type="number" placeholder="Math Score" value={mathScore} onChange={(e) => setMathScore(e.target.value)} required />
        <input type="number" placeholder="Reading Score" value={readingScore} onChange={(e) => setReadingScore(e.target.value)} required />
        <input type="number" placeholder="Writing Score" value={writingScore} onChange={(e) => setWritingScore(e.target.value)} required />
        <motion.button whileHover={{ scale: 1.05 }} type="submit" style={{ padding: "10px", backgroundColor: "#2563EB", color: "#fff", borderRadius: "8px" }}>
          Assign Student
        </motion.button>
      </form>
      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
      {result && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ marginTop: "10px", textAlign: "center" }}>
          <h3>Assigned Group: {result.group}</h3>
          <p><strong>Strength:</strong> {result.strength}</p>
          <p><strong>Weakness:</strong> {result.weakness}</p>
        </motion.div>
      )}
    </motion.div>
  );
}
