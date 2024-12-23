import React, { useState } from "react";

import Dashboard from "../components/Dashboard"; // Import the Dashboard component


// Department Collapse Component
const DepartmentCollapse = ({ department, fields, collapsed, onToggle, renderInputField }) => {
  return (
    <div style={{ marginBottom: "20px" }}>
      <button
        type="button"
        onClick={() => onToggle(department)}
        style={{
          background: "#4CAF50",
          color: "white",
          padding: "10px",
          borderRadius: "5px",
          width: "100%",
          cursor: "pointer",
          textAlign: "left",
          fontSize: "16px",
          fontWeight: "bold",
        }}
      >
        {department} {collapsed ? "▲" : "▼"}
      </button>
      {!collapsed && (
        <div style={{ marginTop: "10px" }}>
          {fields.map((key) => (
            <div key={key}>
              <label
                htmlFor={key}
                style={{
                  display: "block",
                  marginBottom: "5px",
                  fontWeight: "bold",
                }}
              >
                {key.replace(/([A-Z])/g, " $1").replace(/^\w/, (c) => c.toUpperCase())}
              </label>
              {renderInputField(key)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Main Form Component
function ItemOpening() {
  const [formData, setFormData] = useState({
    no: "",
    description: "",
    baseUnitOfMeasure: "",
    scrapPercentage: "",
    manufacturingPolicy: "",
    routingNo: "",
    productionBomNo: "",
    inventoryPostingGroup: "",
    genProdPostingGroup: "",
    globalDimension1Code: "",
    globalDimension2Code: "",
    gstGroupCode: "",
    hsnSacCode: "",
    gstCredit: "",
    gstImportDutyCode: "",
    hsCode: "",
    hsCodeForPrint: "",
    bcdPercentage: "",
    dutyDrawbackRate: "",
    rodtepRate: "",
    itemCategoryCode: "",
    vendorNo: "",
    leadTimeCalculation: "",
    reorderPoint: "",
    reorderQuantity: "",
    commodityCode: "",
    replenishmentSystem: "",
    roundingPrecision: "",
    purchUnitOfMeasure: "",
    reorderingPolicy: "",
    overReceiptCode: "",
    subcontracting: false,
    purchaseTolerance: "",
    purchaseToleranceType: "",
    stockkeepingUnit: "",
    locationCodes: "",
    manufacturingPolicy2: "",
    transferFromCode: "",
    qcRequired: false,
    itemSpecificationCode: "",
    type: "",
    itemTrackingCode: "",
    itemClass: "",
    
  });

  const [collapsed, setCollapsed] = useState({
    Design: false,
    Finance: false,
    Purchase: false,
    Quality: false,
    Store: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:5000/auth/item-opening", {
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
        alert("Failed to save the item. Please try again.");
      });
  };

  const options = {
    manufacturingPolicy: [
      { value: "0", label: "Make to Stock" },
      { value: "1", label: "Make to Order" },
    ],
    gstCredit: [
      { value: "0", label: "Availment" },
      { value: "1", label: "Non-Availment" },
    ],
    replenishmentSystem: [
      { value: "0", label: "Purchase" },
      { value: "1", label: "Prod. Order" },
      { value: "2", label: "Transfer" },
      { value: "3", label: "Assembly" },
    ],
    reorderingPolicy: [
      { value: "1", label: "Fixed Reorder Qty." },
      { value: "2", label: "Maximum Qty." },
      { value: "3", label: "Order" },
      { value: "4", label: "Lot-for-Lot" },
    ],
    purchaseTolerance: [
      { value: "1", label: "A" },
      { value: "2", label: "B" },
      { value: "3", label: "C" },
    ],
    type: [
      { value: "0", label: "Inventory" },
      { value: "1", label: "Service" },
      { value: "2", label: "Non-Inventory" },
    ],
    itemClass: [
      { value: "1", label: "A" },
      { value: "2", label: "B" },
      { value: "3", label: "C" },
    ],
  };

  const renderInputField = (key) => {
    if (options[key]) {
      return (
        <select
          id={key}
          name={key}
          value={formData[key]}
          onChange={handleChange}
          style={{
            width: "100%",
            padding: "8px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        >
          <option value="">Select</option>
          {options[key].map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      );
    }

    if (typeof formData[key] === "boolean") {
      return (
        <select
          id={key}
          name={key}
          value={formData[key] ? "true" : "false"}
          onChange={handleChange}
          style={{
            width: "100%",
            padding: "8px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        >
          <option value="true">True</option>
          <option value="false">False</option>
        </select>
      );
    }

    return (
      <input
        type="text"
        id={key}
        name={key}
        value={formData[key]}
        onChange={handleChange}
        style={{
          width: "100%",
          padding: "8px",
          borderRadius: "5px",
          border: "1px solid #ccc",
        }}
      />
    );
  };

  const departmentFields = {
    Design: [
      "no", "description", "baseUnitOfMeasure", "scrapPercentage", "manufacturingPolicy", 
      "routingNo", "productionBomNo",
    ],
    Finance: [
      "inventoryPostingGroup", "genProdPostingGroup", "globalDimension1Code", "globalDimension2Code",
      "gstGroupCode", "hsnSacCode", "gstCredit", "gstImportDutyCode", "hsCode", "hsCodeForPrint", 
      "bcdPercentage", "dutyDrawbackRate", "rodtepRate", "itemCategoryCode",
    ],
    Purchase: [
      "vendorNo", "leadTimeCalculation", "reorderPoint", "reorderQuantity", "commodityCode", 
      "replenishmentSystem", "roundingPrecision", "purchUnitOfMeasure", "reorderingPolicy", "overReceiptCode",
      "subcontracting", "purchaseTolerance", "purchaseToleranceType", "stockkeepingUnit", "locationCodes",
      "manufacturingPolicy2", "transferFromCode",
    ],
    Quality: ["qcRequired", "itemSpecificationCode"],
    Store: ["type", "itemTrackingCode", "itemClass"],
  };

  const toggleCollapse = (department) => {
    setCollapsed((prevState) => ({
      ...prevState,
      [department]: !prevState[department],
    }));
  };

  return (
    <div style={{ margin: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        Item Opening Form
      </h2>
      <form
        onSubmit={handleSubmit}
        style={{
          maxWidth: "1000px",
          margin: "0 auto",
          padding: "20px",
          border: "1px solid #ccc",
          borderRadius: "10px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px",
        }}
      >
        {Object.keys(departmentFields).map((department) => (
          <DepartmentCollapse
            key={department}
            department={department}
            fields={departmentFields[department]}
            collapsed={collapsed[department]}
            onToggle={toggleCollapse}
            renderInputField={renderInputField}
          />
        ))}
        <button
          type="submit"
          style={{
            gridColumn: "1 / -1",
            padding: "10px",
            backgroundColor: "#4CAF50",
            color: "white",
            fontWeight: "bold",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default ItemOpening;
