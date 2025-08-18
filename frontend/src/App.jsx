import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import DashboardAdmin from "./pages/DashboardAdmin";
import DashboardUser from "./pages/DashboardUser";
import DashboardOwner from "./pages/DashboardOwner";
import Navbar from "./components/Navbar";
import "./App.css";

function App() {
  const [user, setUser] = useState(null); // { role: 'admin' | 'user' | 'owner' }

  return (
   <>
      <Navbar user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<Login setUser={setUser} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin" element={user?.role === "admin" ? <DashboardAdmin /> : <Navigate to="/" />} />
        <Route path="/user" element={user?.role === "user" ? <DashboardUser /> : <Navigate to="/" />} />
        <Route path="/owner" element={user?.role === "owner" ? <DashboardOwner /> : <Navigate to="/" />} />
        <Route path="/dashboard" element={<DashboardUser />} />

      </Routes>
   </>

  );
}

export default App;
