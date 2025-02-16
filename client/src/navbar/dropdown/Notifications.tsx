import React, { useState } from "react";
import { Bell } from "lucide-react";

const Notifications: React.FC = () => {
  const notifications = [
    "Option 1",
    "Option 2",
    "Option 3",
    "Option 4",
    "Option 5",
  ];

  return (
    <div className="absolute right-0 shadow-xl top-6 mt-2 w-56 z-50 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-900 rounded-lg">
      <div className="p-2 font-semibold border-b">Notifications</div>
      <ul className="divide-y">
        {notifications.map((item, index) => (
          <li
            key={index}
            className="flex items-center gap-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-900 cursor-pointer"
          >
            <Bell className="h-5 w-5 text-gray-500" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notifications;
