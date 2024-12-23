import React, { useState } from "react";
import axios from "axios"; // Import Axios for HTTP requests
import { Link } from "react-router-dom";
import "../styles/VisitorManagement.css"; // Assuming you create a CSS file for styling

const VisitorManagement = () => {
  const [visitorData, setVisitorData] = useState({
    name: "",
    email: "",
    contactNumber: "",
    companyname:"",
    address:"",
    department: "",
    whomMeet:"",
    purpose: "",
    inDateTime: "",
    exitDateTime: "",
  });

  const [message, setMessage] = useState("");

  // Handle visitor registration
const handleRegister = async (e) => {
  e.preventDefault();

  try {
    // Send the visitor data to the backend
    const response = await axios.post("http://localhost:5000/auth/register-visitor", visitorData);

    // Assuming the server responds with { message: "some message" }
    setMessage(response.data.message || "Visitor registered successfully!"); 
    console.log("Visitor Registered:", response.data);
  } catch (error) {
    console.error("Error registering visitor:", error);

    // Set a default error message
    setMessage(error.response?.data?.message || "Failed to register visitor. Please try again.");
  }
};


  return (
    <div className="visitor-container">
      <h1>Visitor Management</h1>
      <form onSubmit={handleRegister}>
        <label>Name:</label>
        <input
          type="text"
          placeholder="Enter visitor's name"
          value={visitorData.name}
          onChange={(e) => setVisitorData({ ...visitorData, name: e.target.value })}
          required
        />

        <label>Email:</label>
        <input
          type="email"
          placeholder="Enter visitor's email"
          value={visitorData.email}
          onChange={(e) => setVisitorData({ ...visitorData, email: e.target.value })}
        />

        <label>Contact Number:</label>
        <input
          type="tel"
          placeholder="Enter visitor's contact number"
          value={visitorData.contactNumber}
          onChange={(e) => setVisitorData({ ...visitorData, contactNumber: e.target.value })}
          required
        />

        <label>Company Name:</label>
        <input
          type="text"
          placeholder="Enter Visitor's company name"
          value={visitorData.companyname}
          onChange={(e) => setVisitorData({ ...visitorData, companyname: e.target.value })}
          required
        />
        
        <label>Address:</label>
        <input
          type="text"
          placeholder="Enter visitor's address"
          value={visitorData.address}
          onChange={(e) => setVisitorData({ ...visitorData, address: e.target.value })}
          required
        />

        <label>Department:</label>
        <input
          type="text"
          placeholder="Enter visitor's department"
          value={visitorData.department}
          onChange={(e) => setVisitorData({ ...visitorData, department: e.target.value })}
          required
        />

        <label>To Whom Meet:</label>
        <input
          type="text"
          placeholder="Enter name of person to meet"
          value={visitorData.whomMeet}
          onChange={(e) => setVisitorData({ ...visitorData, whomMeet: e.target.value })}
          required
        />

        <label>Purpose of Visit:</label>
        <input
          type="text"
          placeholder="Enter purpose of visit"
          value={visitorData.purpose}
          onChange={(e) => setVisitorData({ ...visitorData, purpose: e.target.value })}
          required
        />


        <label>In Date and Time:</label>
        <input
          type="datetime-local"
          value={visitorData.inDateTime}
          onChange={(e) => setVisitorData({ ...visitorData, inDateTime: e.target.value })}
          required
        />

        <label>Exit Date and Time:</label>
        <input
          type="datetime-local"
          value={visitorData.exitDateTime}
          onChange={(e) => setVisitorData({ ...visitorData, exitDateTime: e.target.value })}
          required
        />

        <button type="submit">Register Visitor</button>
      </form>

      {message && <p className="message">{message}</p>}

      <div className="link-container">
        <Link to="/visitor-records">View Visitor Records</Link> | <Link to="/">Go to Home</Link>
      </div>
    </div>
  );
};

export default VisitorManagement;
