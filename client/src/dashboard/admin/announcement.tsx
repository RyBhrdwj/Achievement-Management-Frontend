import React from "react";

const achievementData = [
  {
    id: 1,
    name: "Jatin Gera",
    enrollment: "05120802722",
    avatar:
      "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&h=400&fit=crop",
    achievement: {
      title: "Hackathon X",
      position: "🏆 First Position",
      organization: "Tech Innovators",
      date: "Feb 28, 2025",
    },
  },
  {
    id: 2,
    name: "Nikhil Kumar",
    enrollment: "03320802722",
    avatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop",
    achievement: {
      title: "AI Challenge",
      position: "🥈 Second Position",
      organization: "OpenAI Labs",
      date: "March 2, 2025",
    },
  },
  {
    id: 3,
    name: "Priya Sharma",
    enrollment: "04420802722",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    achievement: {
      title: "Cyber Security Summit",
      position: "🏅 Winner",
      organization: "CyberTech",
      date: "Jan 15, 2025",
    },
  },
];

const Announcement = () => {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 ">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">
          Announcements
        </h3>
      </div>

      {/* Achievement Announcements List */}
      <div className="space-y-4 rounded-lg h-[375px] overflow-y-scroll overflow-x-hidden">
        {achievementData.map((student) => (
          <div
            key={student.id}
            className="flex items-center bg-gray-100 dark:bg-gray-700 p-4 rounded-lg shadow-sm transition-all duration-200 hover:scale-[1.02]"
          >
            <img
              src={student.avatar}
              alt={student.name}
              className="w-12 h-12 rounded-full object-cover mr-4 border-2 border-indigo-500"
            />
            <div className="flex-grow">
              <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {student.name}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-300">
                {student.enrollment}
              </p>
              <div className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                <span className="font-medium">{student.achievement.position}</span> in{" "}
                <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                  {student.achievement.title}
                </span>
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">
                Organized by{" "}
                <span className="font-medium text-blue-600 dark:text-blue-400">
                  {student.achievement.organization}
                </span>{" "}
                on {student.achievement.date}.
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Announcement;
