const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const db = require("../lib/db"); // Import the MySQL connection
const excel = require("exceljs");
const router = express.Router();
const crypto = require('crypto');

const nodemailer = require("nodemailer");
const moment = require('moment');

// Register Route
router.post(
  "/register",
  [
    check("email", "Valid email is required").isEmail(),
    check("password", "Password must be at least 6 characters").isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, phone } = req.body;

    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the user into the MySQL database
    const query = "INSERT INTO users (name, email, password, phone) VALUES (?, ?, ?, ?)";
    
    db.query(query, [name, email, hashedPassword, phone], (err, result) => {
      if (err) {
        console.error("Error inserting user into database:", err);
        return res.status(500).json({ message: "Failed to register user" });
      }

      //console.log("User inserted into database:", result);
      return res.status(201).json({ message: "User registered successfully!" });
    });
  }
);


// Visitor Registration Route
router.post(
  "/register-visitor",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Valid email is required").isEmail(),
    check("contactNumber", "Contact number is required").not().isEmpty(),
    check("companyname", "Company's name is required").not().isEmpty(),
    check("address", "Address is required").not().isEmpty(),
    check("department", "Department is required").not().isEmpty(),
    check("whomMeet", "To whom meet is required").not().isEmpty(),
    check("purpose", "Purpose is required").not().isEmpty(),
    
    check("inDateTime", "In DateTime is required").not().isEmpty(),
    check("exitDateTime", "Exit DateTime is required").not().isEmpty(),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email,contactNumber,companyname,address, department,whomMeet, purpose,  inDateTime, exitDateTime } = req.body;

    // Insert visitor data into the MySQL database
    const query = `
      INSERT INTO visitors 
      (name, email,contactNumber,companyname,address, department,whomMeet, purpose,  inDatetime, exitDatetime) 
      VALUES (?, ?, ?, ?, ?, ?, ?,?,?,?)
    `;

    db.query(query, [name, email,contactNumber,companyname,address, department,whomMeet, purpose,  inDateTime, exitDateTime], (err, result) => {
      if (err) {
        console.error("Error inserting visitor into database:", err);
        return res.status(500).json({ message: "Failed to register visitor" });
      }

      return res.status(201).json({ message: "Visitor registered successfully!" });
    });
  }
);



// Fetch all visitor records
router.get("/visitor-records", (req, res) => {
  const query = "SELECT * FROM visitors";

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching visitor records:", err);
      return res.status(500).json({ message: "Failed to fetch records" });
    }
    res.status(200).json(results);
  });
});

// Download visitor records as Excel
router.get("/visitor-records/download", async (req, res) => {
  const query = "SELECT * FROM visitors";

  db.query(query, async (err, results) => {
    if (err) {
      console.error("Error fetching visitor records:", err);
      return res.status(500).json({ message: "Failed to fetch records" });
    }

    const workbook = new excel.Workbook();
    const worksheet = workbook.addWorksheet("Visitor Records");

    // Add column headers
    worksheet.columns = [
      { header: "ID", key: "id", width: 10 },
      { header: "Name", key: "name", width: 20 },
      { header: "Email", key: "email", width: 30 },
      { header: "Contact Number", key: "contactNumber", width: 15 },
      { header: "Company Name", key: "companyname", width: 25 },
      { header: "Address", key: "address", width: 30 },
      { header: "Department", key: "department", width: 20 },
      { header: "Whom to Meet", key: "whomMeet", width: 20 },
      { header: "Purpose", key: "purpose", width: 30 },
      { header: "In DateTime", key: "inDatetime", width: 25 },
      { header: "Exit DateTime", key: "exitDatetime", width: 25 },
    ];

    // Add rows
    worksheet.addRows(results);

    // Set headers and send the file
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=Visitor_Records.xlsx"
    );

    await workbook.xlsx.write(res);
    res.end();
  });
});




// POST /item-opening route
router.post(
  "/item-opening",
  [
    // Validations for critical fields
    check("no", "It should be maximum 20 character").isLength({ max: 20 }),
    check("description", "It should be maximum 10 character").isLength({ max: 10 }),
    check("no", "It should be maximum 20 character").isLength({ max: 20 }),
    check("description", "Description is required").not().isEmpty(),
    check("baseUnitOfMeasure", "Base Unit of Measure is required").not().isEmpty(),
    check("unitPrice", "Unit Price must be a valid number").optional().isFloat(),
    check("inventoryPostingGroup", "Inventory Posting Group is required").not().isEmpty(),
    
    // Add validations for other fields as necessary
  ],
  async (req, res) => {
    try {
      // Validate request
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const formData = req.body;

      // Construct query dynamically
      const columns = Object.keys(formData).join(", ");
      const values = Object.values(formData);
      const placeholders = values.map(() => "?").join(", ");

      const query = `
        INSERT INTO item_opening (${columns})
        VALUES (${placeholders})
      `;

      // Execute query
      db.query(query, values, (err, result) => {
        if (err) {
          console.error("Error inserting item into database:", err, { query, values });
          return res.status(500).json({ message: "Failed to save the item" });
        }

        res.status(201).json({ message: "Item saved successfully!", data: result });
      });
    } catch (error) {
      console.error("Unexpected error in item-opening route:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

module.exports = router;




// Custom Opening Route
router.post(
  "/custom-opening",
  [
    // Add validations for some critical fields; expand as needed
    check("no", "Item number is required").not().isEmpty(),
    check("name", "Name is required").not().isEmpty(),
    check("address", "Address is required").not().isEmpty(),
    check("phoneno", "Phone number is required").not().isEmpty(),
    check("email", "Email is required").isEmail(),
    check("amount", "Amount must be a valid number").optional().isFloat(),
    // Add more validations as required for your form fields
  ],
  (req, res) => {
    // Handle validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const formData = req.body;

    // Dynamic query to insert all form data
    const columns = Object.keys(formData).join(", ");
    const values = Object.values(formData);
    const placeholders = values.map(() => "?").join(", ");

    const query = `
      INSERT INTO customopening (${columns}) 
      VALUES (${placeholders})
    `;

    // Insert data into the database
    db.query(query, values, (err, result) => {
      if (err) {
        console.error("Error inserting data into database:", err, { query, values });
        return res.status(500).json({ message: "Failed to save the item" });
      }

      return res.status(201).json({ message: "Item saved successfully!" });
    });
  }
);


// Route to handle POST request for /vendor-opening
router.post('/vendor-opening', (req, res) => {
  const formData = req.body;

  // Optional: Validate the form data (check for required fields)
  const requiredFields = [
    'no', 'name', 'searchName', 'address', 'city', 'contact',
    'phone', 'ourAccountNo', 'territoryCode', 'globalDimension1',
    'globalDimension2', 'vendorPostingGroup', 'currencyCode',
    'paymentTermsCode'
  ];

  // Check if any required field is missing
  for (let field of requiredFields) {
    if (!formData[field]) {
      return res.status(400).json({ error: `${field} is required` });
    }
  }

  // Prepare the SQL query to insert the data into the vendor_openings table
  const query = `
    INSERT INTO vendoropening (
      no, name, searchName, name2, address, city, contact, phone,
      ourAccountNo, territoryCode, globalDimension1, globalDimension2,
      vendorPostingGroup, currencyCode, paymentTermsCode
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)
  `;

  // Values to insert into the database
  const values = [
    formData.no, formData.name, formData.searchName, formData.name2 || null, 
    formData.address, formData.city, formData.contact, formData.phone, 
    formData.ourAccountNo, formData.territoryCode, formData.globalDimension1, 
    formData.globalDimension2, formData.vendorPostingGroup, 
    formData.currencyCode, formData.paymentTermsCode
  ];

  // Execute the query
  db.query(query, values, (err, results) => {
    if (err) {
      console.error('Error inserting data:', err);
      return res.status(500).json({ error: 'Failed to submit vendor opening form' });
    }
    console.log('Data inserted successfully:', results);
    res.status(201).json({
      message: 'Vendor opening form submitted successfully!',
    });
  });
});



router.post('/forgot-password', (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  db.query('SELECT * FROM users WHERE email = ?', [email], (err, result) => {
    if (err) {
      console.error("Error fetching user:", err);
      return res.status(500).json({ message: "Internal Server Error" });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const userId = result[0].id;
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpiry = moment().add(10, 'minutes').format('YYYY-MM-DD HH:mm:ss');

    db.query(
      'INSERT INTO users (id, reset_token, reset_token_expiry) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE reset_token = VALUES(reset_token), reset_token_expiry = VALUES(reset_token_expiry)',
      [userId, resetToken, resetTokenExpiry],
      (err) => {
        if (err) {
          console.error("Error saving token:", err);
          return res.status(500).json({ message: "Internal Server Error" });
        }

        res.status(200).json({
          message: "Password reset initiated. Please check your email.",
          resetToken: resetToken, // Remove this in production!
          redirectUrl: "/reset-password",
        });
      }
    );
  });
});




router.post('/reset-password', (req, res) => {
  const { resetToken, newPassword } = req.body;

  if (!resetToken || !newPassword) {
    return res.status(400).json({ message: "Token and new password are required" });
  }

  db.query(
    'SELECT * FROM users WHERE reset_token = ? AND reset_token_expiry > ?',
    [resetToken, moment().format('YYYY-MM-DD HH:mm:ss')],
    (err, result) => {
      if (err) {
        console.error("Error verifying token:", err);
        return res.status(500).json({ message: "Internal Server Error" });
      }
      if (result.length === 0) {
        return res.status(400).json({ message: "Invalid or expired token" });
      }

      const userId = result[0].id;

      db.query('UPDATE users SET password = ? WHERE id = ?', [newPassword, userId], (err) => {
        if (err) {
          console.error("Error updating password:", err);
          return res.status(500).json({ message: "Failed to reset password" });
        }

        db.query('DELETE FROM users WHERE id = ?', [userId], (err) => {
          if (err) {
            console.error("Error deleting reset token:", err);
          }
        });

        res.status(200).json({ message: "Password has been successfully reset" });
      });
    }
  );
});




{/*
// Route: Forgot Password
router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required." });
  }

  try {
    // Check if email exists in the database
    const [user] = await db.promise().query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (user.length === 0) {
      return res.status(404).json({ message: "Email not found." });
    }

    // Generate a random reset token (simple example)
    const resetToken = Math.random().toString(36).substring(2, 12);

    // Save token and expiry time in the database
    const expiryTime = new Date(Date.now() + 60 * 60 * 1000); // 1 hour from now
    await db
      .promise()
      .query(
        "UPDATE users SET reset_token = ?, reset_token_expiry = ? WHERE email = ?",
        [resetToken, expiryTime, email]
      );

    // Configure Nodemailer for sending the reset email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "ajaykr3903@gmail.com", // Replace with your email
        pass: "AjA@3748", // Replace with your email password or app password
      },
    });

    const resetUrl = `http://localhost:3000/reset-password?token=${resetToken}`;
    const mailOptions = {
      from: "ajaykr3903@gmail.com",
      to: email,
      subject: "Password Reset Request",
      text: `You requested to reset your password. Use the following link to reset your password: ${resetUrl}`,
    };

    await transporter.sendMail(mailOptions);

    res.json({ message: "Password reset link sent to your email." });
  } catch (err) {
    console.error("Error in forgot-password route:", err);
    res.status(500).json({ message: "An error occurred. Please try again." });
  }
});

*/}



// Login Route
router.post(
  "/login",
  [
    check("email", "Valid email is required").isEmail(),
    check("password", "Password is required").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }


    const { email, password } = req.body;
   
    // Find the user in the database
    const query = "SELECT * FROM users WHERE email = ?";
    db.query(query, [email], async (err, results) => {
      if (err) {
        console.error("Error querying the database:", err);
        return res.status(500).json({ message: "Server error" });
      }

      if (results.length === 0) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      const user = results[0];
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      // Create JWT token
      const token = jwt.sign({ email: user.email }, "your_jwt_secret", { expiresIn: "1h" });
      res.json({ token, message: "Login successful!" });
    });
  }
);

module.exports = router;

