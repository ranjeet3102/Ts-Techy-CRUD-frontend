
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

/**
 * ProductDetails.jsx
 * - Uses embedded CSS so you don't need Tailwind set up.
 * - Image is fixed-size and always left on medium+ screens.
 * - Content on the right, responsive stacking on small screens.
 */
export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("access");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`https://ts-techy-crud-1.onrender.com/api/products/${id}/`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.status === 401 || res.status === 403) {
          localStorage.removeItem("access");
          navigate("/login");
          return;
        }

        const data = await res.json();
        setProduct(data);
      } catch (err) {
        console.error("Error fetching product details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, navigate, token]);

  if (loading) {
    return (
      <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <strong>Loading product details...</strong>
      </div>
    );
  }

  if (!product) {
    return (
      <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center", color: "red" }}>
        <strong>Product not found</strong>
      </div>
    );
  }

  return (
    <>
      {/* Embedded CSS so nothing else is required */}
      <style>{`
        .pd-page {
          min-height: 100vh;
          background: #f3f4f6;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 32px;
          box-sizing: border-box;
        }
        .pd-card {
          background: #fff;
          box-shadow: 0 10px 25px rgba(0,0,0,0.08);
          border-radius: 16px;
          max-width: 1100px;
          width: 100%;
          display: grid;
          grid-template-columns: 1fr;
          gap: 24px;
          padding: 24px;
          box-sizing: border-box;
        }
        /* Two-column layout on medium+ screens: image left, content right */
        @media (min-width: 768px) {
          .pd-card {
            grid-template-columns: 420px 1fr;
            align-items: center;
          }
        }
        .pd-image {
          width: 100%;
          height: 320px; /* fixed height for uniform images */
          max-width: 420px;
          border-radius: 12px;
          overflow: hidden;
          background: #e5e7eb;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .pd-image img {
          width: 100%;
          height: 100%;
          object-fit: cover; /* preserves aspect ratio and fills */
        }
        .pd-info { padding: 6px 2px; }
        .product-title { font-size: 28px; margin: 0 0 8px; color: #111827; }
        .category { color: #6b7280; margin-bottom: 6px; }
        .price { color: #16a34a; font-size: 22px; font-weight: 700; margin: 8px 0; }
        .short-desc { color: #374151; margin-bottom: 12px; }
        .full-desc { color: #374151; line-height: 1.5; }
        .actions { margin-top: 18px; display: flex; gap: 12px; flex-wrap: wrap; }
        .btn-primary {
          background: #2563eb; color: #fff; border: none; padding: 10px 16px; border-radius: 10px;
          cursor: pointer; font-weight: 600; box-shadow: 0 6px 14px rgba(37,99,235,0.18);
        }
        .btn-ghost {
          background: #f3f4f6; color: #111827; border: none; padding: 10px 16px; border-radius: 10px;
          cursor: pointer; font-weight: 600;
        }
        /* small tweak: limit long paragraphs width */
        .full-desc p { margin: 8px 0 0; }
      `}</style>

      <div className="pd-page">
        <div className="pd-card" role="article" aria-label={`Product details for ${product.name}`}>
          {/* LEFT: IMAGE */}
          <div className="pd-image" aria-hidden={product.image ? "false" : "true"}>
            {product.image ? (
              <img src={product.image} alt={product.name} />
            ) : (
              <div style={{ color: "#6b7280", textAlign: "center", padding: 12 }}>No Image Available</div>
            )}
          </div>

          {/* RIGHT: INFO */}
          <div className="pd-info">
            <h1 className="product-title">{product.name}</h1>

            <div className="category"><strong>Category:</strong> {product.category || "—"}</div>

            <div className="price">₹{product.price}</div>

            <div className="short-desc"><strong>Short Description:</strong> {product.description}</div>

            <div className="full-desc" style={{ marginTop: 12 }}>
              <strong>Full Description:</strong>
              <p>{product.full_description || "No further details available."}</p>
            </div>

            <div className="actions">
              <button
                className="btn-primary"
                onClick={() => alert("Buy flow not implemented yet")}
                aria-label="Buy now"
              >
                Buy Now
              </button>
              <button className="btn-ghost" onClick={() => navigate(-1)} aria-label="Go back">
                Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
