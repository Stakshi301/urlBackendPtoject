import React from "react";

export default function DashboardOwner() {
  return (
    <div className="dashboard">
      <h2>Store Owner Dashboard</h2>
      <p>Average Rating: 4.2</p>
      <h3>Users who rated your store:</h3>
      <ul>
        <li>John - 5</li>
        <li>Sarah - 4</li>
      </ul>
    </div>
  );
}
