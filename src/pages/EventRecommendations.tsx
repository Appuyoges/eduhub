import { useState } from "react";
import axios from "axios";

export default function EventRecommendations() {
  const [rollNumber, setRollNumber] = useState("");
  const [events, setEvents] = useState<any[]>([]);
  const [error, setError] = useState("");

  const fetchRecommendations = async () => {
    setError("");
    try {
      const response = await axios.post("http://localhost:5000/recommend", { rollNumber });
      setEvents(response.data.recommendations);
    } catch (err) {
      setError("Error fetching recommendations.");
    }
  };

  return (
    <div className="flex flex-col items-center p-8 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">🎯 Event Recommendations</h2>
      <input
        type="number"
        placeholder="Roll Number"
        className="p-2 border rounded-md"
        value={rollNumber}
        onChange={(e) => setRollNumber(e.target.value)}
      />
      <button onClick={fetchRecommendations} className="mt-4 p-2 bg-green-500 text-white rounded-md">
        Get Event Recommendations
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      <div className="mt-4 w-full max-w-lg">
        {events.map((event, index) => (
          <div key={index} className="p-4 bg-white shadow-md rounded-md mb-2">
            <h3 className="text-lg font-bold">{event.eventName}</h3>
            <p className="text-gray-600">Skills Required: {event.requiredSkills}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
