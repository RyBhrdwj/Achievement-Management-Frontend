import React, { useState, useRef, useEffect } from 'react';
import { Bell, Trash2, Circle } from 'lucide-react';
import { useTheme } from '@/context/ThemeProvider';
import { cn } from '@/lib/utils';

interface Notification {
  id: number;
  title: string;
  description?: string;
  timestamp: string;
  isUnread: boolean;
}

const Notifications: React.FC = () => {
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([
    { 
      id: 1, 
      title: 'Achievement Added', 
      description: 'Your new achievement has been recorded',
      timestamp: '2 mins ago',
      isUnread: true 
    },
    { 
      id: 2, 
      title: 'Profile Updated', 
      description: 'Your profile information was successfully updated',
      timestamp: '1 hour ago',
      isUnread: false 
    },
    { 
      id: 3, 
      title: 'New Event', 
      description: 'You have been invited to a new event',
      timestamp: '3 hours ago',
      isUnread: true 
    },
  ]);
  const notificationRef = useRef<HTMLDivElement>(null);

  const toggleNotifications = () => {
    setIsOpen(!isOpen);
  };

  const removeNotification = (id: number) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Check if there are any unread notifications
  const hasUnreadNotifications = notifications.some(n => n.isUnread);

  return (
    <div className="relative" ref={notificationRef}>
      <div 
        onClick={toggleNotifications}
        className="relative cursor-pointer"
      >
        <Bell 
          className={cn(
            "cursor-pointer",
            theme === "dark" ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-black"
          )}
        />
        {hasUnreadNotifications && (
          <span 
            className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full animate-pulse"
          />
        )}
      </div>
      
      {isOpen && (
        <div 
          className={cn(
            "absolute right-0 top-full mt-2 w-80 rounded-lg shadow-lg z-50 border",
            theme === "dark" 
              ? "bg-gray-900  border-[#2C2C2C] text-white" 
              : "bg-white border-gray-200"
          )}
        >
          <div className="p-4 border-b dark:border-[#2C2C2C] flex justify-between items-center">
            <h2 className="text-lg font-bold">Notifications</h2>
            {notifications.length > 0 && (
              <button 
                onClick={clearAllNotifications}
                className={cn(
                  "text-xs",
                  theme === "dark" 
                    ? "text-gray-400 hover:text-white" 
                    : "text-gray-500 hover:text-black"
                )}
              >
                Clear All
              </button>
            )}
          </div>
          
          <div className="max-h-64 overflow-y-auto">
            {notifications.length === 0 ? (
              <div 
                className={cn(
                  "p-4 text-center",
                  theme === "dark" 
                    ? "text-gray-400" 
                    : "text-gray-500"
                )}
              >
                No notifications
              </div>
            ) : (
              notifications.map((notification) => (
                <div 
                  key={notification.id}
                  className={cn(
                    "flex items-start justify-between p-4 border-b last:border-b-0 transition-colors duration-200",
                    theme === "dark" 
                      ? "border-[#2C2C2C] hover:bg-gray-800" 
                      : "border-gray-100 hover:bg-gray-50",
                    notification.isUnread 
                      ? (theme === "dark" 
                          ? "bg-blue-950" 
                          : "bg-blue-50")
                      : ""
                  )}
                >
                  <div className="flex items-start space-x-3">
                    <Circle 
                      className={cn(
                        "w-3 h-3 mt-1",
                        notification.isUnread 
                          ? "text-blue-500 fill-blue-500" 
                          : "text-gray-300 dark:text-gray-600 fill-transparent"
                      )}
                    />
                    <div>
                      <h3 className="font-semibold">{notification.title}</h3>
                      <p 
                        className={cn(
                          "text-xs",
                          theme === "dark" 
                            ? "text-gray-400" 
                            : "text-gray-500"
                        )}
                      >
                        {notification.description}
                      </p>
                      <span 
                        className={cn(
                          "text-xs",
                          theme === "dark" 
                            ? "text-gray-500" 
                            : "text-gray-400"
                        )}
                      >
                        {notification.timestamp}
                      </span>
                    </div>
                  </div>
                  <Trash2 
                    onClick={() => removeNotification(notification.id)}
                    className={cn(
                      "w-4 h-4 cursor-pointer",
                      theme === "dark" 
                        ? "text-gray-400 hover:text-white" 
                        : "text-gray-500 hover:text-black"
                    )}
                  />
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Notifications;