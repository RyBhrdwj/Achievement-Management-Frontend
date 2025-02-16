import React, { useState } from "react";
import { Bell, Moon, Search, Sun, User, Menu, X } from "lucide-react";
import { Logo } from "@/assets";
import { Link } from "react-router-dom";
import { useTheme } from "@/context/ThemeProvider";
import Notifications from "./dropdown/Notifications";
import { motion } from "framer-motion";

const Navbar: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <nav className="flex items-center justify-between px-4 py-2 border-b bg-white text-gray-900 dark:bg-gray-900 dark:text-white">
      <div className="flex justify-center items-center gap-2">
        <img src={Logo} className="h-10 w-auto" />
        <h1 className="text-lg font-semibold hidden lg:block">Achievement Management</h1>
      </div>
      
      <div className="hidden lg:flex space-x-6">
        <Link to="/" className="hover:text-gray-500 dark:hover:text-gray-400">Dashboard</Link>
        <Link to="/add-event" className="hover:text-gray-500 dark:hover:text-gray-400">Add Achievement</Link>
      </div>

      <div className="flex items-center space-x-3 lg:space-x-4">
        <Search className="text-gray-600 dark:text-gray-300 cursor-pointer hidden lg:block" />
        <button onClick={() => setIsOpen(!isOpen)} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
          <Bell className="h-6 w-6" />
        </button>
        <div className="relative">{isOpen && <Notifications />}</div>
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="relative flex items-center justify-center w-10 h-10 rounded-full bg-zinc-400 hover:bg-zinc-600 transition-colors duration-300 shadow-md"
        >
          <span className="w-6 h-6 text-white transition-transform duration-300">
            {theme === "light" ? <Moon className="animate-fadeIn" /> : <Sun className="animate-fadeIn" />}
          </span>
        </button>
        <div className="w-px h-6 bg-gray-300 dark:bg-gray-700 hidden lg:block"></div>
        <button className="hidden lg:flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white">
          <User className="w-6 h-6 bg-gray-300 dark:bg-gray-600 rounded-full" />
          <span>Sign In/Sign Up</span>
        </button>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="lg:hidden p-2 rounded-md">
          {isSidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      
      {isSidebarOpen && (
        <motion.div 
          initial={{ x: "100%" }} 
          animate={{ x: 0 }} 
          exit={{ x: "100%" }} 
          transition={{ duration: 0.3 }}
          className="fixed top-0 right-0 w-64 h-full bg-white dark:bg-gray-900 shadow-lg p-4 flex flex-col space-y-4 z-50"
        >
          <button onClick={() => setIsSidebarOpen(false)} className="self-end p-2">
            <X className="h-6 w-6" />
          </button>
          <Link to="/" className="hover:text-gray-500 dark:hover:text-gray-400">Dashboard</Link>
          <Link to="/add-event" className="hover:text-gray-500 dark:hover:text-gray-400">Add Achievement</Link>
          <button className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white">
            <User className="w-6 h-6 bg-gray-300 dark:bg-gray-600 rounded-full" />
            <span>Sign In/Sign Up</span>
          </button>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
