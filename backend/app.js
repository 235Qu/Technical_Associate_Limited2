const express = require("express"); // Import Express
const cors = require("cors");      // Import CORS middleware

const app = express(); // Initialize Express

app.use(cors()); // Use CORS middleware
app.use(express.json()); // Middleware to parse JSON

// Mount routes


// Define your routes
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

