import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => (
  <nav className="navbar">
    <ul className="navbar-links">
      <li><Link to="/">Home</Link></li>
      <li><Link to="/VisitorManagement">Visitor Management</Link></li>
      <li><Link to="/erp">ERP Management</Link></li>
      
    </ul>
  </nav>
);

export default Navbar;
