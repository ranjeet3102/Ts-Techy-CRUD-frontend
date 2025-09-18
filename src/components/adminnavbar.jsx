
import React from "react";
import { NavLink } from "react-router-dom";
import "./adminnavbar.css";

export default function Navbar() {
  return (
    <nav className="navbar" role="navigation">
      <div className="navbar-left">
        <NavLink to="/admin" className="logo">
          AdminPanel
        </NavLink>
      </div>
     
      <div className="navbar-right">
        {/* <NavLink to="/profile" className="user-icon" aria-label="Profile">
          <span role="img" aria-label="user">&#128100;</span>
        </NavLink> */}
        <NavLink to="/login" className="user-icon" aria-label="Logout">
          Logout
        </NavLink>
      </div>
    </nav>
  );
}
