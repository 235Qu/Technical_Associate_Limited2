const db = require("../config/db");

exports.registerUser = (req, res) => {
  const { name, email, password, phone, role } = req.body;

  if (!name || !email || !password || !phone) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Check if user already exists
  const checkUserQuery = "SELECT * FROM users WHERE email = ?";
  db.query(checkUserQuery, [email], (err, results) => {
    if (err) {
      console.error("Error checking user:", err);
      return res.status(500).json({ message: "Internal Server Error" });
    }

    if (results.length > 0) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Insert new user
    const insertUserQuery =
      "INSERT INTO users (name, email, password, phone, role) VALUES (?, ?, ?, ?, ?)";
    db.query(
      insertUserQuery,
      [name, email, password, phone, role || "candidate"],
      (err) => {
        if (err) {
          console.error("Error registering user:", err);
          return res.status(500).json({ message: "Internal Server Error" });
        }

        res.status(201).json({ message: "User registered successfully" });
      }
    );
  });
};
