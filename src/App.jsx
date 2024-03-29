import "./App.css";
import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import Login from "./pages/Login";
import Hotels from "./pages/Hotels";
import Booking from "./pages/Booking";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import HotelDetails from "./pages/HotelDetails";
import Footer from "./components/Footer";

function App() {
  const navigate = useNavigate();

  const session = JSON.parse(localStorage.getItem("session"));

  useEffect(() => {
    if (window.location.pathname === "/login" && session) {
      navigate("/");
    }
    if (!session) {
      navigate("/login");
    }
  }, []);

  return (
    <div className="App font-[raleway]">
      {!session ? (
        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>
      ) : (
        <>
          <Navbar />
          <Routes>
            <Route path="/" element={<Hotels />} />
            <Route path="/hotel/:id" element={<HotelDetails />} />
            <Route path="/booking/:id" element={<Booking />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
          <Footer />
        </>
      )}
      <Toaster />
    </div>
  );
}

export default App;
