import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ForgotPassword from "./pages/ForgotPassword";
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Erp from './pages/Erp'; // Ensure the path matches your file structure
import NRegister from './pages/NRegister';
import Login from './pages/Login';
import Dashboard from "./components/Dashboard";
import VisitorManagement from './pages/VisitorManagement';
import CustomOpening from './pages/CustomOpening';
import ItemOpening from './pages/ItemOpening';
import VendorOpening from './pages/VendorOpening';
import VisitorRecords from './components/VisitorRecords';
import ResetPassword from './pages/ResetPassword';

const App = () => (
  <Router>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Erp" element={<Erp />} />
      <Route path="/NRegister" element={<NRegister />} />
      <Route path="/login" element={Login} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/VisitorManagement" element={<VisitorManagement />} />
      <Route path="/CustomOpening" element={<CustomOpening />} />
      <Route path="/ItemOpening" element={<ItemOpening />} />
      <Route path="/VendorOpening" element={<VendorOpening />} />
      <Route path="/visitor-records" element={<VisitorRecords />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />}/>
      {/* Other routes like Chairman, IT, HR */}
    </Routes>
  </Router>
);

export default App;


//import logo from './logo.svg';
//import './App.css';

//function App() {
  //return (
    //<div className="App">
      //<header className="App-header">
        //<img src={logo} className="App-logo" alt="logo" />
        //<p>
          //Edit <code>src/App.js</code> and save to reload.
        //</p>
        //<a
          //className="App-link"
          //href="https://reactjs.org"
          //target="_blank"
          //rel="noopener noreferrer"
        //>
          //Learn React
        //</a>
      //</header>
    //</div>
  //);
//}

//export default App;
