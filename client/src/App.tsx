import {  Outlet } from "react-router-dom";
import { Routes, Route } from 'react-router-dom';
import Navbar from "./navbar/navbar";
import ThemeProvider from "./context/ThemeProvider";
import MentorDashboard from "./dashboard/mentor-dashboard";

function App() {
  return (
    <ThemeProvider>
      <Navbar />
      <Outlet />
    </ThemeProvider>
  );
}

export default App;
