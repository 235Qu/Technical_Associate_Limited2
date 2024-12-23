import React from "react";
import "../styles/Dashboard.css"; // Add styles for this page

function Dashboard() {
  return (
    <div className="dashboard-container">
      <nav className="navbar">
        <ul>
          <li><a href="/ItemOpening">Item Opening</a></li>
          <li><a href="/CustomOpening">Custom Opening</a></li>
          <li><a href="/VendorOpening">Vendor Opening</a></li>
        </ul>
      </nav>
      <div className="content">
        <h1>Welcome to ERP</h1>
      </div>
    </div>
  );
}

export default Dashboard;
