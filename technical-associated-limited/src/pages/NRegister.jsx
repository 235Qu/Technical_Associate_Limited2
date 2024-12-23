import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link from React Router
import "../styles/NRegister.css"; // Assuming you create a CSS file for styles
import axios from "axios"; // Install axios using 'npm install axios'

function NRegister() {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
     
  });

  const [message, setMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      // Post data to your backend API
      const response = await axios.post("http://localhost:5000/auth/register", userData);
      setMessage(response.data.message || "Registration successful!");
    } catch (error) {
      console.error("Error registering user:", error);
      setMessage(error.response?.data?.message || "Failed to register. Please try again.");
    }
  };

  return (
    <div className="form-container">
      <h2>New Candidate Registration</h2>
      {message && <p className="message">{message}</p>}
      <form onSubmit={handleRegister}>
        <label>Name:</label>
        <input
          type="text"
          placeholder="Enter your full name"
          value={userData.name}
          onChange={(e) => setUserData({ ...userData, name: e.target.value })}
          required
        />

        <label>Email:</label>
        <input
          type="email"
          placeholder="Enter your email"
          value={userData.email}
          onChange={(e) => setUserData({ ...userData, email: e.target.value })}
          required
        />

        <label>Password:</label>
        <input
          type="password"
          placeholder="Enter a secure password"
          value={userData.password}
          onChange={(e) =>
            setUserData({ ...userData, password: e.target.value })
          }
          required
        />

        <label>Phone Number:</label>
        <input
          type="tel"
          placeholder="Enter your phone number"
          value={userData.phone}
          onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
          required
        />

        

        <button type="submit">Register</button>

        {/* Navigation link to Login */}
        <div>
          
          <Link to="/erp">Already Registered Login</Link>
        </div>

      </form>
    </div>
  );
}

export default NRegister;
