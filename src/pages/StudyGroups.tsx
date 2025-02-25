import { useState } from "react";
import "./StudyGroups.css";

const groupsData = [
  { id: 1, name: "AI & Machine Learning", type: "Study Group", members: 120, trending: true },
  { id: 2, name: "Football Club", type: "Sports Club", members: 85, trending: false },
  { id: 3, name: "Robotics Enthusiasts", type: "Tech Club", members: 95, trending: true },
  { id: 4, name: "Photography Lovers", type: "Hobby Club", members: 60, trending: false },
  { id: 5, name: "Entrepreneurship Forum", type: "Business Club", members: 150, trending: true },
  { id: 6, name: "Yoga & Wellness", type: "Health Club", members: 70, trending: false },
];

export default function GroupHub() {
  const [joinedGroups, setJoinedGroups] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleJoin = (id: number) => {
    setJoinedGroups((prev) =>
      prev.includes(id) ? prev.filter((groupId) => groupId !== id) : [...prev, id]
    );
  };

  const filteredGroups = groupsData.filter((group) =>
    group.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Page Title */}
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">📚 Study & Club Groups Hub</h1>
      <p className="text-center text-gray-600 mb-8">Join groups based on your interests and connect with like-minded people!</p>

      {/* Search Bar */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search for a group..."
          className="p-3 border rounded-lg w-1/2"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Group List */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGroups.map((group) => (
          <div key={group.id} className="bg-white p-6 rounded-lg shadow-md">
            {/* Group Name & Type */}
            <h3 className="text-2xl font-semibold text-gray-900">{group.name}</h3>
            <p className="text-gray-500">{group.type}</p>

            {/* Members Count & Trending Tag */}
            <p className="mt-2 text-gray-600">👥 {group.members} Members</p>
            {group.trending && <span className="text-sm text-red-500 font-bold">🔥 Trending</span>}

            {/* Join / Leave Button */}
            <button
              onClick={() => toggleJoin(group.id)}
              className={`mt-4 px-5 py-2 rounded-lg font-bold transition ${
                joinedGroups.includes(group.id) ? "bg-red-500 text-white" : "bg-blue-500 text-white"
              }`}
            >
              {joinedGroups.includes(group.id) ? "Leave Group" : "Join Group"}
            </button>
          </div>
        ))}
      </div>

      {/* Unique Features Section */}
      <div className="mt-12 p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-gray-800">✨ Unique Features</h2>
        <ul className="list-disc pl-6 text-gray-700 mt-4 space-y-2">
          <li>💬 Live Chat for Group Members</li>
          <li>🔥 Trending Groups Highlighted</li>
          <li>🔍 Search & Filter Functionality</li>
          <li>📌 Personalized Recommendations</li>
        </ul>
      </div>
    </div>
  );
}
