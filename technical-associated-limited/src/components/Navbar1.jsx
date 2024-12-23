import React from "react";
import { Link } from "react-router-dom";
import '../styles/Navbar1.css'; // Import the external CSS

function Navbar1() {
  return (
    <nav className="navbar">
      <h1 style={{ textAlign: 'center', width: '100%' }}>ERP System</h1> {/* Inline CSS to center */}
      <div className="menu">
        <Link to="/item-opening">Item Opening</Link>
        <Link to="/Custom-opening">Custom-Opening</Link>
        <Link to="/vendor-opening">Vendor Opening</Link>
      </div>
    </nav>
  );
}

export default Navbar1;

