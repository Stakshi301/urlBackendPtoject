import React, { useState } from "react";
import api from "../api";

export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", address: "", password: "" });

  const handleSubmit = async () => {
    try {
      await api.post("/user/register", form);
      alert("Signup successful! Please login.");
    } catch (err) {
      alert("Signup failed: " + err.response?.data?.message);
    }
  };

  return (
    <div className="form-container">
      <h2>Signup</h2>
      <input placeholder="Name" onChange={e => setForm({ ...form, name: e.target.value })} />
      <input placeholder="Email" onChange={e => setForm({ ...form, email: e.target.value })} />
      <input placeholder="Address" onChange={e => setForm({ ...form, address: e.target.value })} />
      <input type="password" placeholder="Password" onChange={e => setForm({ ...form, password: e.target.value })} />
      <button onClick={handleSubmit}>Signup</button>
    </div>
  );
}
