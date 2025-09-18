// components/AdminLayout.js

import React from "react";
import Navbar from "./adminnavbar"; 
import { Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div>
      <Navbar />
        <Outlet />
      
    </div>
  );
}
