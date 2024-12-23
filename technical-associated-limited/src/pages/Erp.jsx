import React from "react";
import { Routes, Route } from "react-router-dom";
//import Navbar from "../components/Navbar1";
import Login from "../pages/Login";
import NRegister from "../pages/NRegister";
import ForgotPassword from "../pages/ForgotPassword";
//import ItemOpening from "./ItemOpening";
//import CustomOpening from "./CustomOpening";
//import VendorOpening from "./VendorOpening";
import "../styles/Home.css";
//<Route path="/" element={<Register />} />
function Erp() {
  return (
    <div >
      
      
      
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/" element={<NRegister />} />
        <Route path="/" element={<ForgotPassword />} />
      </Routes>
    </div>
  );
}

export default Erp;
