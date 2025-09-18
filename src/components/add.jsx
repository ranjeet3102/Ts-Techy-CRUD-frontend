import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const styles = {
  container: {
    maxWidth: 900,
    margin: "2rem auto",
    padding: "1rem",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  heading: {
    fontSize: "2rem",
    marginBottom: "1rem",
    color: "#2c3e50",
  },
  form: {
    backgroundColor: "#f9fafb",
    padding: "1.5rem",
    borderRadius: 12,
    boxShadow: "0 4px 6px rgb(0 0 0 / 0.1)",
    marginBottom: "2rem",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  input: {
    padding: "0.75rem 1rem",
    fontSize: "1rem",
    borderRadius: 8,
    border: "1px solid #ccd0d5",
    outline: "none",
    transition: "border-color 0.3s ease",
  },
  inputFocus: {
    borderColor: "#007bff",
  },
  textarea: {
    resize: "vertical",
    minHeight: 80,
    padding: "0.75rem 1rem",
    fontSize: "1rem",
    borderRadius: 8,
    border: "1px solid #ccd0d5",
    outline: "none",
    transition: "border-color 0.3s ease",
  },
  buttonsContainer: {
    display: "flex",
    gap: "1rem",
    marginTop: "0.5rem",
  },
  buttonPrimary: {
    flex: 1,
    cursor: "pointer",
    backgroundColor: "#007bff",
    color: "#fff",
    fontWeight: "600",
    borderRadius: 8,
    border: "none",
    padding: "0.75rem 1rem",
    fontSize: "1rem",
    boxShadow: "0 4px 6px rgb(0 123 255 / 0.4)",
    transition: "background-color 0.3s ease",
  },
  buttonPrimaryDisabled: {
    backgroundColor: "#6c757d",
    cursor: "not-allowed",
    boxShadow: "none",
  },
  buttonSecondary: {
    flex: 1,
    cursor: "pointer",
    backgroundColor: "#e9ecef",
    color: "#343a40",
    fontWeight: "600",
    borderRadius: 8,
    border: "none",
    padding: "0.75rem 1rem",
    fontSize: "1rem",
    transition: "background-color 0.3s ease",
  },
  buttonSecondaryHover: {
    backgroundColor: "#ced4da",
  },
  productList: {
    listStyleType: "none",
    padding: "0",
  },
  productItem: {
    backgroundColor: "#fff",
    marginBottom: "1rem",
    padding: "1rem",
    borderRadius: 12,
    boxShadow: "0 4px 6px rgb(0 0 0 / 0.05)",
    display: "flex",
    gap: "1rem",
    alignItems: "center",
    flexWrap: "wrap",
  },
  productInfo: {
    flexGrow: 1,
  },
  productName: {
    margin: 0,
    fontSize: "1.25rem",
    fontWeight: "700",
    color: "#2c3e50",
  },
  productCategory: {
    fontStyle: "italic",
    color: "#6c757d",
    marginBottom: "0.5rem",
  },
  productDescription: {
    marginBottom: "0.25rem",
    color: "#495057",
  },
  productFullDesc: {
    fontSize: "0.9rem",
    color: "#6c757d",
    marginTop: "0",
  },
  productImage: {
    width: 100,
    height: 100,
    objectFit: "cover",
    borderRadius: 12,
    border: "1px solid #dee2e6",
    boxShadow: "0 2px 4px rgb(0 0 0 / 0.1)",
  },
  productButtons: {
    display: "flex",
    gap: "0.5rem",
  },
  actionButton: {
    padding: "0.5rem 1rem",
    borderRadius: 8,
    border: "none",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "0.9rem",
    transition: "background-color 0.3s ease",
  },
  editButton: {
    backgroundColor: "#0d6efd",
    color: "white",
  },
  editButtonHover: {
    backgroundColor: "#084cd2",
  },
  deleteButton: {
    backgroundColor: "#dc3545",
    color: "white",
  },
  deleteButtonHover: {
    backgroundColor: "#a52834",
  },
};

export default function Add() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
    full_description: "",
    category: "",
    price: "",
    image: null,
  });
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingProductId, setEditingProductId] = useState(null);
  const token = localStorage.getItem("access");
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const res = await fetch("https://ts-techy-crud-1.onrender.com/api/products/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status === 401 || res.status === 403) {
        localStorage.removeItem("access");
        navigate("/login");
        return;
      }
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      fetchProducts();
    }
  }, [token, navigate]);

  const uploadImageToCloudinary = async (file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "ts_crud");
    const cloudName = "dg4uhdhlo";
    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        { method: "POST", body: data }
      );
      const result = await res.json();
      return result.secure_url || null;
    } catch (err) {
      console.error("Cloudinary upload error:", err);
      return null;
    }
  };

  const handleEditClick = (product) => {
    setIsEditing(true);
    setEditingProductId(product.id);
    setForm({
      name: product.name,
      description: product.description,
      full_description: product.full_description || "",
      category: product.category || "",
      price: product.price,
      image: null,
    });
    window.scrollTo(0, 0);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditingProductId(null);
    setForm({
      name: "",
      description: "",
      full_description: "",
      category: "",
      price: "",
      image: null,
    });
    const fileInput = document.querySelector('input[type="file"]');
    if (fileInput) fileInput.value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      let imageUrl = null;
      if (form.image) {
        imageUrl = await uploadImageToCloudinary(form.image);
        if (!imageUrl) {
          alert("Image upload failed. Please try again.");
          setIsSubmitting(false);
          return;
        }
      }
      const payload = {
        name: form.name,
        description: form.description,
        full_description: form.full_description,
        category: form.category,
        price: form.price,
      };
      if (imageUrl) payload.image = imageUrl;
      const method = isEditing ? "PUT" : "POST";
      const url = isEditing
        ? `https://ts-techy-crud-1.onrender.comapi/products/${editingProductId}/`
        : "https://ts-techy-crud-1.onrender.com/api/products/";
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
      if (response.ok) {
        handleCancelEdit();
        fetchProducts();
      } else {
        const resData = await response.json();
        alert("Error saving product: " + (resData.detail || "Unknown error"));
      }
    } catch (err) {
      console.error("Error submitting product:", err);
      alert("An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        const res = await fetch(`https://ts-techy-crud-1.onrender.com/api/products/${id}/`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          fetchProducts();
        } else {
          console.error("Failed to delete product:", res.status);
        }
      } catch (err) {
        console.error("Error deleting product:", err);
      }
    }
  };

  if (loading)
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
          fontSize: "1.5rem",
          color: "#6c757d",
        }}
      >
        Loading...
      </div>
    );

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>{isEditing ? "Edit Product" : "Add New Product"}</h2>
      <form onSubmit={handleSubmit} style={styles.form} noValidate>
        <input
          type="text"
          placeholder="Product Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
          style={styles.input}
          onFocus={(e) => (e.target.style.borderColor = "#007bff")}
          onBlur={(e) => (e.target.style.borderColor = "#ccd0d5")}
        />
        <input
          type="text"
          placeholder="Short Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          required
          style={styles.input}
          onFocus={(e) => (e.target.style.borderColor = "#007bff")}
          onBlur={(e) => (e.target.style.borderColor = "#ccd0d5")}
        />
        <textarea
          placeholder="Full Description"
          value={form.full_description}
          onChange={(e) => setForm({ ...form, full_description: e.target.value })}
          required
          rows="4"
          style={styles.textarea}
          onFocus={(e) => (e.target.style.borderColor = "#007bff")}
          onBlur={(e) => (e.target.style.borderColor = "#ccd0d5")}
        />
        <input
          type="text"
          placeholder="Category"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          required
          style={styles.input}
          onFocus={(e) => (e.target.style.borderColor = "#007bff")}
          onBlur={(e) => (e.target.style.borderColor = "#ccd0d5")}
        />
        <input
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          required
          style={styles.input}
          onFocus={(e) => (e.target.style.borderColor = "#007bff")}
          onBlur={(e) => (e.target.style.borderColor = "#ccd0d5")}
        />
        <input
          type="file"
          onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
          style={{ marginTop: "0.5rem" }}
        />
        <div style={styles.buttonsContainer}>
          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              ...styles.buttonPrimary,
              ...(isSubmitting ? styles.buttonPrimaryDisabled : {}),
            }}
          >
            {isEditing ? (isSubmitting ? "Updating..." : "Update Product") : isSubmitting ? "Adding..." : "Add Product"}
          </button>
          {isEditing && (
            <button
              type="button"
              onClick={handleCancelEdit}
              disabled={isSubmitting}
              style={styles.buttonSecondary}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#ced4da")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "#e9ecef")}
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <h3 style={{ ...styles.heading, fontSize: "1.5rem" }}>All Products</h3>
      <ul style={styles.productList}>
        {products.map((p) => (
          <li key={p.id} style={styles.productItem}>
            {/* Product image */}
            {p.image && <img src={p.image} alt={p.name} style={styles.productImage} />}
            {/* Product info */}
            <div style={styles.productInfo}>
              <p style={styles.productName}>{p.name}</p>
              <p style={styles.productCategory}>{p.category}</p>
              <p style={styles.productDescription}>₹{p.price}</p>
              <p style={styles.productDescription}>{p.description}</p>
              {p.full_description && <p style={styles.productFullDesc}>{p.full_description}</p>}
            </div>
            {/* Edit/Delete buttons */}
            <div style={styles.productButtons}>
              <button
                style={{ ...styles.actionButton, ...styles.editButton }}
                onClick={() => handleEditClick(p)}
                onMouseEnter={(e) => (e.target.style.backgroundColor = "#084cd2")}
                onMouseLeave={(e) => (e.target.style.backgroundColor = "#0d6efd")}
              >
                Edit
              </button>
              <button
                style={{ ...styles.actionButton, ...styles.deleteButton }}
                onClick={() => handleDelete(p.id)}
                onMouseEnter={(e) => (e.target.style.backgroundColor = "#a52834")}
                onMouseLeave={(e) => (e.target.style.backgroundColor = "#dc3545")}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
