
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "user",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const res = await fetch("https://ts-techy-crud-1.onrender.com/api/auth/signup/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        await res.json();
        setMessage("Signup successful! Redirecting...");
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      } else {
        const errData = await res.json();
        setMessage("Signup failed: " + JSON.stringify(errData));
      }
    } catch (error) {
      setMessage("Signup failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "linear-gradient(135deg, #493264 0%, #261942 100%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden", // ✅ keep overflow hidden
        fontFamily: "Segoe UI, Arial, sans-serif",
        margin: 0,
        padding: 0,
      }}
    >
      <div
        style={{
          display: "flex",
          width: "100%",
          maxWidth: "720px", // ⬅️ reduced width
          minWidth: "300px",
          borderRadius: "20px",
          boxShadow: "0 6px 28px #0006",
          background: "rgba(47,34,64,0.99)",
          overflow: "hidden",
          height: "auto",
          flexWrap: "wrap",
        }}
      >
        {/* Left image panel */}
        <div
          style={{
            flex: 1,
            background: `url('YOUR_IMAGE_URL') center/cover no-repeat`,
            minWidth: "220px",
            height: "100%",
          }}
        />
        {/* Right form panel */}
        <div
          style={{
            flex: 1,
            minWidth: "260px",
            padding: "2rem", // ⬅️ reduced padding
            background: "rgba(34,30,46,0.96)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <h2
            style={{
              textAlign: "left",
              marginBottom: "1rem",
              fontSize: "1.8rem", // smaller heading
              color: "#fafaff",
              fontWeight: "bold",
            }}
          >
            Create Your Account
          </h2>

          {message && (
            <div
              style={{
                marginBottom: "1rem",
                color: message.includes("successful") ? "#64fe9a" : "#ff708e",
                background: message.includes("successful")
                  ? "#273e34"
                  : "#3b2430",
                padding: "0.7rem",
                borderRadius: "8px",
                fontWeight: 500,
                fontSize: "0.95rem",
                textAlign: "center",
                border: `1.5px solid ${
                  message.includes("successful") ? "#64fe9a" : "#ff708e"
                }`,
              }}
            >
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} autoComplete="off" style={{ width: "100%" }}>
            <div style={{ marginBottom: "0.9rem" }}>
              <label
                htmlFor="username"
                style={{
                  display: "block",
                  marginBottom: "0.3rem",
                  color: "#bcbbcc",
                  fontWeight: 500,
                }}
              >
                Username
              </label>
              <input
                id="username"
                name="username"
                placeholder="Enter username"
                value={formData.username}
                onChange={handleChange}
                required
                style={{
                  width: "100%",
                  padding: "0.75rem 1rem", // ⬅️ smaller input
                  borderRadius: "8px",
                  border: "1.5px solid #2d2840",
                  fontSize: "1rem",
                  outline: "none",
                  background: "#222036",
                  color: "#fafaff",
                  marginBottom: "0.5rem",
                  boxSizing: "border-box",
                }}
              />
            </div>
            <div style={{ marginBottom: "0.9rem" }}>
              <label
                htmlFor="email"
                style={{
                  display: "block",
                  marginBottom: "0.3rem",
                  color: "#bcbbcc",
                  fontWeight: 500,
                }}
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Enter email address"
                value={formData.email}
                onChange={handleChange}
                required
                style={{
                  width: "100%",
                  padding: "0.75rem 1rem",
                  borderRadius: "8px",
                  border: "1.5px solid #2d2840",
                  fontSize: "1rem",
                  outline: "none",
                  background: "#222036",
                  color: "#fafaff",
                  marginBottom: "0.5rem",
                  boxSizing: "border-box",
                }}
              />
            </div>
            <div style={{ marginBottom: "1rem" }}>
              <label
                htmlFor="password"
                style={{
                  display: "block",
                  marginBottom: "0.3rem",
                  color: "#bcbbcc",
                  fontWeight: 500,
                }}
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Create password"
                value={formData.password}
                onChange={handleChange}
                required
                style={{
                  width: "100%",
                  padding: "0.75rem 1rem",
                  borderRadius: "8px",
                  border: "1.5px solid #2d2840",
                  fontSize: "1rem",
                  outline: "none",
                  background: "#222036",
                  color: "#fafaff",
                  marginBottom: "0.5rem",
                  boxSizing: "border-box",
                }}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                padding: "0.85rem 0",
                borderRadius: "8px",
                fontSize: "1.05rem",
                fontWeight: "bold",
                border: "none",
                color: "#fff",
                background: loading
                  ? "linear-gradient(90deg, #9c7ae7, #af93e2)"
                  : "linear-gradient(90deg, #7f4ae8 0%, #9158e8 100%)",
                cursor: loading ? "not-allowed" : "pointer",
                boxShadow: loading ? "none" : "0 2px 8px rgba(127, 74, 232, 0.09)",
                opacity: loading ? 0.7 : 1,
                transition: "background 0.2s, opacity 0.2s",
                margin: "1rem 0 0.5rem 0",
                boxSizing: "border-box",
              }}
            >
              {loading ? "Signing up..." : "Sign Up"}
            </button>
          </form>

          <div
            style={{
              textAlign: "center",
              margin: "1.5rem 0 0 0",
              background: "none",
            }}
          >
            <span style={{ color: "#b8b7cc", fontSize: "0.95rem" }}>
              Already have an account?
            </span>
            <br />
            <button
              onClick={() => navigate("/login")}
              style={{
                background: "none",
                color: "#7f4ae8",
                padding: "0.5rem 1rem",
                border: "none",
                borderRadius: "6px",
                fontSize: "0.95rem",
                fontWeight: 500,
                marginTop: "0.4rem",
                cursor: "pointer",
                outline: "none",
                textDecoration: "underline",
              }}
            >
              Go to Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
