import React from "react";
import { Routes, Route } from "react-router-dom";
import EventForm from "./Pages/event-form";
import Dashboard from "./dashboard/dashboard";

function App() {
  return (
 
      <div className="container mx-auto p-4">
        {/* <h1 className="text-2xl font-bold mb-4">Shadcn UI Button Test</h1>
      <TestButton /> */}
        <Routes>
          <Route path="/" element={<EventForm />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>

  );
}

export default App;
