
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProductDetail from "./pages/ProductDetail";
import Add from "./components/add";
import UserDashboard from "./pages/UserDashboard";
import AdminLayout from "./components/adminlayout";
import UserHome from './pages/userhomepage'
function App() {
  const [role, setRole] = useState(null);

  return (
    <Router>
      <Routes>
        
        <Route path="/login" element={<Login setRole={setRole} />} />
        <Route path="/" element={<Signup />} />
       
        <Route path="/user" element={<UserHome />} />
        <Route path="/userdashboard" element={<UserDashboard />} />
       <Route path="/product/:id" element={<ProductDetail />} />

      </Routes>
    
      <Routes>
         <Route path="/admin" element={<AdminLayout />}>
       
        <Route path="/admin" element={<Add />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
