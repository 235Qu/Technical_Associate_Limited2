import React, { useState } from "react";

const VendorOpening = () => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);  // Reset any previous errors

    try {
      const response = await fetch("http://localhost:5000/auth/vendor-opening", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData), // Send the formData as JSON
      });

      if (!response.ok) {
        throw new Error("Failed to submit data");
      }

      const result = await response.json();
      console.log("Form Data Submitted:", result);

      // Handle success (You can show a success message or redirect the user)
      alert("Vendor Opening submitted successfully!");
    } catch (err) {
      setError(err.message); // Set the error state in case of failure
      console.error("Error submitting form:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Vendor Opening Form</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        {/* Row 1 */}
        <div style={styles.row}>
          <div style={styles.formGroup}>
            <label>No.</label>
            <input
              type="text"
              name="no"
              onChange={handleChange}
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label>Name</label>
            <input
              type="text"
              name="name"
              onChange={handleChange}
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label>Search Name</label>
            <input
              type="text"
              name="searchName"
              onChange={handleChange}
              style={styles.input}
            />
          </div>
        </div>

        {/* Row 2 */}
        <div style={styles.row}>
          <div style={styles.formGroup}>
            <label>Name 2</label>
            <input
              type="text"
              name="name2"
              onChange={handleChange}
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label>Address</label>
            <input
              type="text"
              name="address"
              onChange={handleChange}
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label>City</label>
            <input
              type="text"
              name="city"
              onChange={handleChange}
              style={styles.input}
            />
          </div>
        </div>

        {/* Row 3 */}
        <div style={styles.row}>
          <div style={styles.formGroup}>
            <label>Contact</label>
            <input
              type="text"
              name="contact"
              onChange={handleChange}
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label>Phone No.</label>
            <input
              type="tel"
              name="phone"
              onChange={handleChange}
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label>Our Account No.</label>
            <input
              type="text"
              name="ourAccountNo"
              onChange={handleChange}
              style={styles.input}
            />
          </div>
        </div>

        {/* Row 4 */}
        <div style={styles.row}>
          <div style={styles.formGroup}>
            <label>Territory Code</label>
            <input
              type="text"
              name="territoryCode"
              onChange={handleChange}
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label>Global Dimension 1 Code</label>
            <input
              type="text"
              name="globalDimension1"
              onChange={handleChange}
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label>Global Dimension 2 Code</label>
            <input
              type="text"
              name="globalDimension2"
              onChange={handleChange}
              style={styles.input}
            />
          </div>
        </div>

        {/* Additional Fields */}
        <div style={styles.formGroup}>
          <label>Vendor Posting Group</label>
          <input
            type="text"
            name="vendorPostingGroup"
            onChange={handleChange}
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label>Currency Code</label>
          <input
            type="text"
            name="currencyCode"
            onChange={handleChange}
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label>Payment Terms Code</label>
          <input
            type="text"
            name="paymentTermsCode"
            onChange={handleChange}
            style={styles.input}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          style={styles.submitButton}
          disabled={loading} // Disable the button when loading
        >
          {loading ? "Submitting..." : "Submit"}
        </button>

        {/* Error Message */}
        {error && <p style={styles.error}>{error}</p>}
      </form>
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    maxWidth: "900px",
    margin: "0 auto",
    backgroundColor: "#f9f9f9",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    borderRadius: "8px",
  },
  heading: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#333",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    gap: "15px",
    marginBottom: "15px",
  },
  formGroup: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },
  input: {
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    fontSize: "14px",
  },
  submitButton: {
    padding: "10px 20px",
    backgroundColor: "#4CAF50",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    fontSize: "16px",
    cursor: "pointer",
    alignSelf: "center",
    marginTop: "20px",
  },
  error: {
    color: "red",
    textAlign: "center",
    marginTop: "10px",
  },
};

export default VendorOpening;
