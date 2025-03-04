import {  Outlet } from "react-router-dom";
import Navbar from "./navbar/navbar";
import ThemeProvider from "./context/ThemeProvider";

function App() {
  return (
    <ThemeProvider>
      <Navbar />
      <main className="pt-14">
      <Outlet />
      </main>
    </ThemeProvider>
  );
}

export default App;
