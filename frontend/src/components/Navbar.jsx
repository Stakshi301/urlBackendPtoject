import React from "react";
import { Link } from "react-router-dom";

export default function Navbar({ user, setUser }) {
  return (
    <nav className="navbar">
      <h2>Store Rating App</h2>
      <div>
        {!user && <Link to="/">Login</Link>}
        {!user && <Link to="/signup">Signup</Link>}
        {user && <button onClick={() => setUser(null)}>Logout</button>}
      </div>
    </nav>
  );
}
