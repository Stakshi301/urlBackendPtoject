import React, { useEffect, useState } from "react";
import api from "../api";

export default function DashboardAdmin() {
  const [stats, setStats] = useState({ users: 0, stores: 0, ratings: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get("/admin/dashboard");
        setStats(res.data);
      } catch (err) {
        console.error("Error fetching stats:", err);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="dashboard">
      <h2>Admin Dashboard</h2>
      <p>Total Users: {stats.users}</p>
      <p>Total Stores: {stats.stores}</p>
      <p>Total Ratings: {stats.ratings}</p>
    </div>
  );
}
