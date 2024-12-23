const express = require("express");
const { registerUser } = require("../controllers/userController");

const router = express.Router();
const db = require("../lib/db");

// Route for user registration
router.post("/register", registerUser);

module.exports = router;
