import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("access"); // clear token
    navigate("/login");
  };

  return (
    <nav
      style={{
        background: "#3498db",
        padding: "1rem 2rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        color: "white",
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      {/* Logo */}
      <h2 style={{ margin: 0, fontWeight: "bold" }}>
        <Link to="/user" style={{ color: "white", textDecoration: "none" }}>
          MyShop
        </Link>
      </h2>

      {/* Desktop Menu */}
      <div className="desktop-menu" style={{ display: "flex", gap: "1.5rem" }}>
        <Link to="/user" style={{ color: "white", textDecoration: "none" }}>
          Home
        </Link>
        <Link to="/userdashboard" style={{ color: "white", textDecoration: "none" }}>
          Dashboard
        </Link>
        <button
          onClick={handleLogout}
          style={{
            background: "white",
            color: "#3498db",
            border: "none",
            padding: "8px 14px",
            borderRadius: "5px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Logout
        </button>
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="mobile-toggle"
        style={{
          background: "transparent",
          border: "none",
          color: "white",
          fontSize: "1.5rem",
          display: "none",
        }}
      >
        ☰
      </button>

      {/* Mobile Menu (toggleable) */}
      {menuOpen && (
        <div
          className="mobile-menu"
          style={{
            position: "absolute",
            top: "60px",
            right: "20px",
            background: "#2980b9",
            padding: "1rem",
            borderRadius: "8px",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <Link
            to="/user"
            style={{ color: "white", textDecoration: "none" }}
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/userdashboard"
            style={{ color: "white", textDecoration: "none" }}
            onClick={() => setMenuOpen(false)}
          >
            Dashboard
          </Link>
          <button
            onClick={handleLogout}
            style={{
              background: "white",
              color: "#3498db",
              border: "none",
              padding: "8px 14px",
              borderRadius: "5px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}
