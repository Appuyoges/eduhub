import "./profile.css";

export default function Profile() {
  return (

    

    <div className="min-h-screen bg-secondary flex flex-col items-center p-6">
      <h2 className="text-3xl font-bold text-dark">👤 My Profile</h2>
      <p className="text-gray-600">View your achievements and progress.</p>

      <div className="grid-container">
        {/* Profile Overview */}
        <div className="grid-item bg-white shadow-lg rounded-lg text-center">
          <h3 className="text-xl font-bold">🏅 John Doe</h3>
          <p className="text-gray-500">AI Enthusiast | ML Engineer</p>
          <div className="mt-4">
            <span className="bg-green-200 text-green-800 px-3 py-1 rounded-lg">Top Performer</span>
            <span className="ml-2 bg-yellow-200 text-yellow-800 px-3 py-1 rounded-lg">Problem Solver</span>
          </div>
        </div>

        {/* Personal Info */}
        <div className="grid-item bg-white shadow-lg rounded-lg">
          <h3 className="text-xl font-bold">📋 Personal Info</h3>
          <p className="text-gray-700">Age: 24</p>
          <p className="text-gray-700">Email: johndoe@example.com</p>
          <p className="text-gray-700">Phone: +123 456 7890</p>
        </div>

        {/* Grades */}
        <div className="grid-item bg-white shadow-lg rounded-lg">
          <h3 className="text-xl font-bold">📚 Grades</h3>
          <div className="flex justify-between">
            <p className="text-gray-700">Subject 1: Machine Learning</p>
            <span className="font-semibold">A+</span>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-700">Subject 2: Data Structures</p>
            <span className="font-semibold">B</span>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-700">Subject 3: Algorithms</p>
            <span className="font-semibold">A</span>
          </div>
        </div>

        {/* Class Timetable */}
        <div className="grid-item bg-white shadow-lg rounded-lg">
          <h3 className="text-xl font-bold">⏰ Class Timetable</h3>
          <ul className="space-y-2 text-gray-700">
            <li>Monday: 9:00 AM - 11:00 AM - Machine Learning</li>
            <li>Tuesday: 10:00 AM - 12:00 PM - Data Structures</li>
            <li>Wednesday: 1:00 PM - 3:00 PM - Algorithms</li>
            <li>Friday: 9:00 AM - 11:00 AM - Machine Learning</li>
          </ul>
        </div>

        {/* Upcoming Test Schedule */}
        <div className="grid-item bg-white shadow-lg rounded-lg">
          <h3 className="text-xl font-bold">📅 Upcoming Test Schedule</h3>
          <ul className="space-y-2 text-gray-700">
            <li>Machine Learning Test - March 5, 2025</li>
            <li>Data Structures Test - March 12, 2025</li>
            <li>Algorithms Test - March 19, 2025</li>
          </ul>
        </div>

        {/* Achievements */}
        <div className="grid-item bg-white shadow-lg rounded-lg">
          <h3 className="text-xl font-bold">🏆 Achievements</h3>
          <ul className="space-y-2 text-gray-700">
            <li>Completed a Machine Learning project with top scores.</li>
            <li>Certified Data Structures Specialist.</li>
            <li>Winner of the 'AI Challenge' hackathon.</li>
          </ul>
        </div>

        {/* Personal Leaderboard Position */}
        <div className="grid-item bg-white shadow-lg rounded-lg">
          <h3 className="text-xl font-bold">🏅 Personal Leaderboard</h3>
          <p className="text-gray-700">Current Position: #3</p>
        </div>

        {/* Rewards */}
        <div className="grid-item bg-white shadow-lg rounded-lg">
          <h3 className="text-xl font-bold">🎉 Rewards</h3>
          <ul className="space-y-2 text-gray-700">
            <li>1st place in 'AI Innovators' competition.</li>
            <li>Free course on Data Science from Udemy.</li>
            <li>Discount voucher for tech gadgets.</li>
          </ul>
        </div>

        {/* Events Attended */}
        <div className="grid-item bg-white shadow-lg rounded-lg">
          <h3 className="text-xl font-bold">🎤 Events Attended</h3>
          <ul className="space-y-2 text-gray-700">
            <li>AI Conference 2024 - March 2024</li>
            <li>Machine Learning Workshop - July 2024</li>
            <li>Hackathon 'Innovators in Tech' - December 2024</li>
          </ul>
        </div>

        {/* Attendance */}
        <div className="grid-item bg-white shadow-lg rounded-lg">
          <h3 className="text-xl font-bold">🗓 Attendance</h3>
          <p className="text-gray-700">Total Present Days: 35</p>
          <p className="text-gray-700">Total Absent Days: 5</p>
        </div>
      </div>
    </div>
  );
}
