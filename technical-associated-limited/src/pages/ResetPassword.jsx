import React, { useState } from "react";
import axios from "axios";

const ResetPassword = ({ token }) => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handlePasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newPassword || !confirmPassword) {
      setError("Both password fields are required.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      // Make a request to reset the password
      const response = await axios.post("http://localhost:5000/auth/reset-password", {
        resetToken: token,
        newPassword,
      });

      setMessage(response.data.message); // Show success message
      setError(""); // Clear error message
    } catch (error) {
      setError(error.response ? error.response.data.message : "An error occurred.");
      setMessage(""); // Clear success message
    }
  };

  const styles = {
    container: {
      fontFamily: "Arial, sans-serif",
      maxWidth: "400px",
      margin: "50px auto",
      padding: "20px",
      border: "1px solid #ccc",
      borderRadius: "5px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      textAlign: "left",
    },
    heading: {
      marginBottom: "20px",
      color: "#333",
      textAlign: "center",
    },
    label: {
      display: "block",
      marginBottom: "8px",
      fontWeight: "bold",
      color: "#333",
    },
    input: {
      width: "100%",
      padding: "10px",
      marginBottom: "15px",
      border: "1px solid #ccc",
      borderRadius: "4px",
      boxSizing: "border-box",
    },
    button: {
      width: "100%",
      padding: "10px",
      backgroundColor: "#28a745",
      color: "white",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      fontWeight: "bold",
      marginTop: "10px",
    },
    buttonHover: {
      backgroundColor: "#218838",
    },
    message: {
      color: "green",
      marginTop: "10px",
      textAlign: "center",
    },
    error: {
      color: "red",
      marginTop: "10px",
      textAlign: "center",
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Change Password</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="newPassword" style={styles.label}>New Password: </label>
        <input
          type="password"
          id="newPassword"
          placeholder="Enter new pasword"
          value={newPassword}
          onChange={handlePasswordChange}
          required
          style={styles.input}
        />
        <br />
        <label htmlFor="confirmPassword" style={styles.label}>Confirm Password: </label>
        <input
          type="password"
          id="confirmPassword"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          required
          style={styles.input}
        />
        <br />
        
    {/*    <label htmlFor="hint" style={styles.label}>Hint of Password: </label>
        <input
          type="password"
          id="thint"
          value={newPassword}
          onChange={handleHintChange}
          required
          style={styles.input}
        /> */}
        <label>
        <input type="checkbox"></input>
        <span style={{ fontWeight: 'bold' }}>I accept the Terms and Conditions</span>
        </label>

        <button
          type="submit"
          style={styles.button}
          onMouseOver={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
          onMouseOut={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
        >
          Reset Password
        </button>
      </form>

      {message && <p style={styles.message}>{message}</p>}
      {error && <p style={styles.error}>{error}</p>}
    </div>
  );
};

export default ResetPassword;
