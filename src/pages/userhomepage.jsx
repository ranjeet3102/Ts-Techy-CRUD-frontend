import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from '../components/usernavbar';
export default function UserHome() {
  const [recentProducts, setRecentProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("access");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchRecentProducts = async () => {
      try {
        const res = await fetch("https://ts-techy-crud-1.onrender.com/api/products/?ordering=-created_at", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch recent products.");
        }

        const data = await res.json();
        setRecentProducts(data.slice(0, 4)); // show 4 latest
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentProducts();
  }, [navigate, token]);

  return (
    <div style={{ fontFamily: "Arial, sans-serif" }}>
      <Navbar/>
      {/* Hero Section */}
      <section
        style={{
          padding: "3rem 2rem",
          background: "linear-gradient(135deg, #3498db, #2ecc71)",
          color: "white",
          textAlign: "center",
        }}
      >
        <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>
          Welcome to Your Ts-Techy👋
        </h1>
        <p style={{ fontSize: "1.2rem", marginBottom: "2rem" }}>
          Explore the latest products and manage your shopping experience easily.
        </p>
        <button
          onClick={() => navigate("/userdashboard")}
          style={{
            padding: "12px 20px",
            backgroundColor: "white",
            color: "#3498db",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "1rem",
            fontWeight: "bold",
          }}
        >
          See Products
        </button>
      </section>

      {/* Recently Added Section */}
      <section style={{ padding: "2rem" }}>
        <h2 style={{ textAlign: "center", marginBottom: "2rem" }}>
          Recently Added Products
        </h2>

        {loading ? (
          <p style={{ textAlign: "center" }}>Loading recent products...</p>
        ) : error ? (
          <p style={{ textAlign: "center", color: "red" }}>Error: {error}</p>
        ) : recentProducts.length === 0 ? (
          <p style={{ textAlign: "center" }}>No products available yet.</p>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {recentProducts.map((product) => (
              <div
                key={product.id}
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "10px",
                  padding: "1rem",
                  textAlign: "center",
                  boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                }}
              >
                {product.image && (
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{
                      width: "100%",
                      height: "150px",
                      objectFit: "cover",
                      borderRadius: "8px",
                      marginBottom: "1rem",
                    }}
                  />
                )}
                <h3>{product.name}</h3>
                <p style={{ color: "#555", fontSize: "0.9rem" }}>
                  {product.description?.slice(0, 60)}...
                </p>
                <p style={{ fontWeight: "bold", margin: "0.5rem 0" }}>
                  ₹{product.price}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
