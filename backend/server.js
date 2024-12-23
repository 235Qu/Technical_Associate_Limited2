// Import dependencies
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const db = require("./lib/db"); // Ensure this points to your database connection logic
const userRoutes = require("./routes/userRoutes"); // Ensure these paths are correct
const authRoutes = require("./routes/auth");

//const errorHandler = require("./middleware/errorHandler")>;

// Configure environment variables
dotenv.config();

// Initialize the app
const app = express();
app.use(bodyParser.json());
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: "http://localhost:3000" })); // CORS configuration
app.use(express.json()); // Parse JSON request bodies

// Routes
app.use("/auth", authRoutes);
app.use("/api/users", userRoutes);


// Example API Endpoint
app.get("/api/users", (req, res) => {
  const query = "SELECT * FROM users"; // Adjust as per your database structure
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching users:", err);
      res.status(500).send("Error fetching users");
      return;
    }
    res.json(results);
  });
});

// Default Route


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


