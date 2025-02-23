import {  Outlet } from "react-router-dom";
import Navbar from "./navbar/navbar";
import ThemeProvider from "./context/ThemeProvider";

function App() {
  return (
    <ThemeProvider>
      <Navbar />
      <Outlet />
    </ThemeProvider>
  );
}

export default App;
