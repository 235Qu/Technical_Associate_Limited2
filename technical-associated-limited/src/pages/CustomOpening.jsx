import React, { useState } from "react";

const CustomOpening = () => {
  const fields = [
    "No.",
    "Name",
    "Search Name",
    "Name 2",
    "Address",
    "Address 2",
    "City",
    "Contact",
    "Phone No.",
    "Ship-to Code",
    "Territory Code",
    "Global Dimension 1 Code",
    "Global Dimension 2 Code",
    "Credit Limit (LCY)",
    "Customer Posting Group",
    "Currency Code",
    "Customer Price Group",
    "Language Code",
    "Payment Terms Code",
    "Salesperson Code",
    "Shipment Method Code",
    "Shipping Agent Code",
    "Place of Export",
    "Customer Disc. Group",
    "Country/Region Code",
    "Amount",
    "Bill-to Customer No.",
    "Priority",
    "Payment Method Code",
    "Last Modified Date Time",
    "Last Date Modified",
    "Application Method",
    "Location Code",
    "Fax No.",
    "VAT Registration No.",
    "Gen. Bus. Posting Group",
    "Postcode",
    "County",
    "Email",
    "Home Page",
    "No. Series",
    "VAT Area Code",
    "VAT Liable",
    "VAT Bus. Posting Group",
    "Reserve",
    "Preferred Bank Account Code",
    "Primary Contact No.",
    "Contact Type",
    "Mobile Phone No.",
    "Shipping Advice",
    "Shipping Time",
    "Shipping Agent Service Code",
    "Service Zone Code",
    "Price Calculation Method",
    "Allow Line Disc.",
    "Base Calendar Code",
    "State Code",
    "P.A.N. No.",
    "GST Registration No.",
    "GST Registration Type",
    "GST Customer Type",
    "ARN No.",
    "Post GST to Customer",
    "Assessee Code",
    "P.A.N. Status",
    "P.A.N. Reference No.",
    "Aggregate Turnover",
    "Column1",
  ];

  const [formData, setFormData] = useState({});

  const handleChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Sending data to the backend API
    fetch("http://localhost:5000/auth/custom-opening", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        alert(data.message || "Item saved successfully!");
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Failed to save the item.");
      });
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Custom Opening Form</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        {fields.map((field, index) => (
          <div key={index} style={styles.formGroup}>
            <label htmlFor={field} style={styles.label}>
              {field}
            </label>
            <input
              type="text"
              id={field}
              name={field}
              style={styles.input}
              onChange={(e) => handleChange(field, e.target.value)}
            />
          </div>
        ))}
        <button type="submit" style={styles.submitButton}>
          Submit
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
  heading: {
    textAlign: "center",
    color: "#333",
    marginBottom: "20px",
  },
  form: {
    background: "#f9f9f9",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  formGroup: {
    marginBottom: "15px",
  },
  label: {
    display: "block",
    marginBottom: "5px",
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    padding: "10px",
    fontSize: "14px",
    border: "1px solid #ccc",
    borderRadius: "4px",
  },
  submitButton: {
    padding: "10px 20px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default CustomOpening;
