const db = require("../config/db");

const UserModel = {
  findByEmail: (email, callback) => {
    const query = "SELECT * FROM users WHERE email = ?";
    db.query(query, [email], callback);
  },
  create: (userData, callback) => {
    const query =
      "INSERT INTO users (name, email, password, phone, role) VALUES (?, ?, ?, ?, ?)";
    db.query(
      query,
      [userData.name, userData.email, userData.password, userData.phone, userData.role],
      callback
    );
  },
};

module.exports = UserModel;
