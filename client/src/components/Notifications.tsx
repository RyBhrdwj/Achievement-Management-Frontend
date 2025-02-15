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
    // Mark all notifications as read when opened
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, isUnread: false }))
    );
  };

  const removeNotification = (id: number) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        notificationRef.current && 
        !notificationRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={notificationRef}>
      <div className="relative">
        <Bell 
          onClick={toggleNotifications}
          className={cn(
            "cursor-pointer",
            theme === "dark" ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-black"
          )}
        />
        {notifications.some(n => n.isUnread) && (
          <span 
            className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full animate-pulse"
          />
        )}
      </div>
      
      {isOpen && (
        <div 
          className={cn(
            "absolute right-0 top-full mt-2 w-80 bg-white rounded-lg shadow-lg z-50 border",
            theme === "dark" 
              ? "bg-[#1E1E1E] border-[#2C2C2C] text-white" 
              : "bg-white border-gray-200"
          )}
        >
          <div className="p-4 border-b dark:border-[#2C2C2C] flex justify-between items-center">
            <h2 className="text-lg font-bold">Notifications</h2>
            {notifications.length > 0 && (
              <button 
                onClick={() => setNotifications([])}
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
            {notifications.map((notification) => (
              <div 
                key={notification.id}
                className={cn(
                  "flex items-start justify-between p-4 border-b last:border-b-0 transition-colors duration-200",
                  theme === "dark" 
                    ? "border-[#2C2C2C] hover:bg-[#2C2C2C]" 
                    : "border-gray-100 hover:bg-gray-50",
                  notification.isUnread 
                    ? (theme === "dark" 
                        ? "bg-[#2A2A2A]" 
                        : "bg-blue-50")
                    : ""
                )}
              >
                <div className="flex items-start space-x-3">
                  <Circle 
                    className={cn(
                      "w-3 h-3 mt-1",
                      notification.isUnread 
                        ? "text-blue-500" 
                        : "text-gray-300 dark:text-gray-600"
                    )}
                    fill={notification.isUnread ? "currentColor" : "transparent"}
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
            ))}
            
            {notifications.length === 0 && (
              <div className="p-4 text-center text-gray-500">
                No notifications
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Notifications;