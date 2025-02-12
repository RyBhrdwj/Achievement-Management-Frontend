import React from "react";
import { Bell, Search, User } from "lucide-react";
import { Logo } from "@/assets";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <nav className="flex items-center justify-between px-4 py-2 border-b bg-white">
      <div className="">
        <img src={Logo} className="h-10 w-auto" />
      </div>
      <div className="flex space-x-6 text-gray-700">
        <Link to={'/'} className="hover:text-black">
          Dashboard
        </Link>
        <Link to={'/add-event'} className="hover:text-black">
          Add Achievement
        </Link>
      </div>

      <div className="flex items-center space-x-4">
        <Search className="text-gray-600 cursor-pointer" />
        <Bell className="text-gray-600 cursor-pointer" />
        <div className="w-px h-6 bg-gray-300"></div>
        <button className="flex items-center space-x-2 text-gray-700 hover:text-black">
          <User className="w-6 h-6 bg-gray-300 rounded-full" />
          <span>Sign In/Sign Up</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
