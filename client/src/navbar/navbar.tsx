import React from "react";
import { Moon, Search, Sun, User } from "lucide-react";
import { Link } from "react-router-dom";
import { useTheme } from "@/context/ThemeProvider";
import Notifications from "@/components/Notifications";
import Logo from "@/assets/logo.webp";

const Navbar: React.FC = () => {
  const { theme, setTheme } = useTheme();

  return (
    <nav className="flex items-center justify-between px-4 py-2 border-b bg-white text-gray-900 dark:bg-gray-900 dark:text-white">
      <div className="flex justify-center items-center gap-2">
        <img src={Logo} alt="Logo" className="h-10 w-auto" />
        <h1>Achievement Management</h1>
      </div>
      
      <div className="flex space-x-6">
        <Link to="/" className="hover:text-gray-500 dark:hover:text-gray-400 transition">
          Dashboard
        </Link>
        <Link to="/add-event" className="hover:text-gray-500 dark:hover:text-gray-400 transition">
          Add Achievement
        </Link>
      </div>

      <div className="flex items-center space-x-4">
        <Search className="text-gray-600 dark:text-gray-300 cursor-pointer hover:text-gray-800 dark:hover:text-gray-100 transition" />
        <Notifications />

        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="relative flex items-center justify-center w-10 h-10 rounded-full bg-zinc-400 hover:bg-zinc-600 transition duration-300 shadow-md"
        >
          {theme === "light" ? (
            <Moon className="w-6 h-6 text-white transition-transform duration-300" />
          ) : (
            <Sun className="w-6 h-6 text-white transition-transform duration-300" />
          )}
        </button>

        {/* Divider */}
        <div className="w-px h-6 bg-gray-300 dark:bg-gray-700"></div>

        <button className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition">
          <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-300 dark:bg-gray-600">
            <User className="w-5 h-5 text-gray-800 dark:text-gray-200" />
          </div>
          <span>Sign In/Sign Up</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
