import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

// Page Components
import Landing from "./pages/Landing";
import Appointments from "./pages/Appointments";
import UserDashboard from "./pages/Dashboard";
import DoctorDashboard from "./pages/DoctorDashboard";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

// Context
import { AppointmentProvider } from "./context/AppointmentContext";

function App() {
  return (
    <AppointmentProvider>
      <BrowserRouter>
        <Routes>
          {/* Landing Page */}
          <Route path="/" element={<Landing />} />
          {/* Appointments Page */}
          <Route path="/appointments" element={<Appointments />} />
          {/* Authentication Pages */}
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          {/* Dashboard Pages */}
          <Route path="/user-dashboard" element={<UserDashboard />} />
          <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
        </Routes>
      </BrowserRouter>
    </AppointmentProvider>
  );
}

export default App;
