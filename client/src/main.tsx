import React from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
import App from "./App";
import "./index.css"; // or "./globals.css"
import Navbar from "./navbar/navbar";
import MentorDashboard from "./dashboard/mentor-dashboard";
import Dashboard from "./dashboard/dashboard";
import EventForm from "./Pages/event-form";
import AdminDashboard from "./dashboard/admin/admin-dashboard";

const Layout: React.FC = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<App />}>
        <Route path="" element={<Dashboard />} />
        <Route path="add-event" element={<EventForm />} />
        <Route path="/mentor/dashboard" element={<MentorDashboard />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Layout />
  </React.StrictMode>
);
