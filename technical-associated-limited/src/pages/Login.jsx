import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [captchaText, setCaptchaText] = useState(""); // Store CAPTCHA text
  const [captchaInput, setCaptchaInput] = useState(""); // Store user input for CAPTCHA
  const navigate = useNavigate();

  // Function to generate random CAPTCHA
  const generateCaptcha = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let captcha = "";
    for (let i = 0; i < 6; i++) {
      captcha += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaText(captcha); // Set the generated CAPTCHA text
  };

  // Run generateCaptcha when the component mounts
  useEffect(() => {
    generateCaptcha();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    // Verify CAPTCHA input
    if (captchaInput !== captchaText) {
      setError("CAPTCHA is incorrect. Please try again.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/auth/login", {
        email,
        password,
      });

      // Save the JWT token to localStorage
      localStorage.setItem("authToken", response.data.token);

      // Redirect to dashboard
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please try again.");
    }
  };

  return (
    <div className="form-container">
      <h2>ERP Login</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleLogin}>
        <label>Email:</label>
        <input
          type="email"
          placeholder="Enter your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label>Password:</label>
        <input
          type="password"
          placeholder="Enter your Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {/* Custom CAPTCHA Section */}
        <div className="captcha-container">
          <label>Enter the CAPTCHA: {captchaText}</label>
          <input
            type="text"
            placeholder="Enter Captcha"
            value={captchaInput}
            onChange={(e) => setCaptchaInput(e.target.value)}
            required
          />
        </div>

        <button type="submit">Login</button>
        <div>
          <a href="/NRegister">New registration</a> |{" "}
          <a href="/forgot-password">Forgot Password</a>
        </div>
      </form>
    </div>
  );
}

export default Login;
