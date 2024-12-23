import React, { useEffect, useState } from "react";
import axios from "axios";

const VisitorRecords = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch visitor records
  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await axios.get("http://localhost:5000/auth/visitor-records");
        setRecords(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching visitor records:", error);
        setLoading(false);
      }
    };

    fetchRecords();
  }, []);

  // Download Excel file
  const downloadExcel = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/auth/visitor-records/download",
        { responseType: "blob" } // Important for file download
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "Visitor_Records.xlsx");
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error("Error downloading Excel file:", error);
    }
  };

  if (loading) return <p>Loading visitor records...</p>;

  return (
    <div>
      <h1>Visitor Records</h1>
      <button onClick={downloadExcel}>Download Excel</button>
      <table border="1" style={{ width: "100%", marginTop: "20px" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Contact Number</th>
            <th>Company Name</th>
            <th>Address</th>
            <th>Department</th>
            <th>Whom to Meet</th>
            <th>Purpose</th>
            <th>In DateTime</th>
            <th>Exit DateTime</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record) => (
            <tr key={record.id}>
              <td>{record.id}</td>
              <td>{record.name}</td>
              <td>{record.email}</td>
              <td>{record.contactNumber}</td>
              <td>{record.companyname}</td>
              <td>{record.address}</td>
              <td>{record.department}</td>
              <td>{record.whomMeet}</td>
              <td>{record.purpose}</td>
              <td>{record.inDatetime}</td>
              <td>{record.exitDatetime}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VisitorRecords;
