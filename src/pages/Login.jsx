
// // // import React, { useState } from "react";
// // // import { useNavigate } from "react-router-dom";
// // // import { GoogleLogin } from "@react-oauth/google";

// // // export default function Login() {
// // //   const [form, setForm] = useState({ username: "", password: "" });
// // //   const [error, setError] = useState("");
// // //   const [loading, setLoading] = useState(false);
// // //   const navigate = useNavigate();

// // //   // ---- Normal Username/Password Login ----
// // //   const handleLogin = async (e) => {
// // //     e.preventDefault();
// // //     setError("");
// // //     setLoading(true);

// // //     try {
// // //       const res = await fetch("https://ts-techy-crud-1.onrender.com/api/auth/login/", {
// // //         method: "POST",
// // //         headers: { "Content-Type": "application/json" },
// // //         body: JSON.stringify(form),
// // //       });

// // //       if (res.ok) {
// // //         const data = await res.json();

// // //         localStorage.setItem("access", data.access);
// // //         localStorage.setItem("refresh", data.refresh);
// // //         localStorage.setItem("role", data.role);

// // //         if (data.role === "admin") {
// // //           navigate("/admin");
// // //         } else {
// // //           navigate("/user");
// // //         }
// // //       } else {
// // //         const errData = await res.json();
// // //         setError("Login failed: " + (errData.detail || "Invalid credentials"));
// // //       }
// // //     } catch (err) {
// // //       setError("Login failed: " + err.message);
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   // ---- Google Login ----
// // //   const handleGoogleSuccess = async (credentialResponse) => {
// // //     try {
// // //       const res = await fetch("https://ts-techy-crud-1.onrender.com/api/social/google/", {
// // //         method: "POST",
// // //         headers: { "Content-Type": "application/json" },
// // //         body: JSON.stringify({ token: credentialResponse.credential }),
// // //       });

// // //       if (res.ok) {
// // //         const data = await res.json();

// // //         localStorage.setItem("access", data.access);
// // //         localStorage.setItem("refresh", data.refresh);
// // //         localStorage.setItem("role", data.role);

// // //         if (data.role === "admin") {
// // //           navigate("/admin");
// // //         } else {
// // //           navigate("/user");
// // //         }
// // //       } else {
// // //         setError("Google login failed.");
// // //       }
// // //     } catch (err) {
// // //       setError("Google login failed: " + err.message);
// // //     }
// // //   };

// // //   return (
// // //     <div
// // //       style={{
// // //         position: "fixed",
// // //         top: 0,
// // //         left: 0,
// // //         width: "100vw",
// // //         height: "100vh",
// // //         background: "linear-gradient(135deg, #493264 0%, #261942 100%)",
// // //         display: "flex",
// // //         justifyContent: "center",
// // //         alignItems: "center",
// // //         overflow: "hidden", // disables scroll bar
// // //         fontFamily: "Segoe UI, Arial, sans-serif",
// // //         padding: 0,
// // //         margin: 0,
// // //       }}
// // //     >
// // //       <div
// // //         style={{
// // //           maxWidth: "430px",
// // //           width: "100%",
// // //           background: "#222036",
// // //           borderRadius: "18px",
// // //           padding: "2.5rem 3rem",
// // //           boxShadow: "0 4px 16px rgba(0, 0, 0, 0.1)",
// // //           display: "flex",
// // //           flexDirection: "column",
// // //           color: "#fafaff",
// // //         }}
// // //       >
// // //         <h2
// // //           style={{
// // //             textAlign: "center",
// // //             marginBottom: "1.5rem",
// // //             fontWeight: "bold",
// // //             fontSize: "2rem",
// // //           }}
// // //         >
// // //           Login
// // //         </h2>

// // //         {error && (
// // //           <p
// // //             style={{
// // //               color: "#ff4d6d",
// // //               backgroundColor: "#fff0f0",
// // //               padding: "0.8rem",
// // //               borderRadius: "8px",
// // //               marginBottom: "1.5rem",
// // //               textAlign: "center",
// // //               fontWeight: "500",
// // //             }}
// // //           >
// // //             {error}
// // //           </p>
// // //         )}

// // //         <form onSubmit={handleLogin}>
// // //           <input
// // //             type="text"
// // //             placeholder="Username"
// // //             value={form.username}
// // //             onChange={(e) => setForm({ ...form, username: e.target.value })}
// // //             required
// // //            style={{
// // //   width: "100%",
// // //   padding: "1rem 1.1rem",
// // //   marginBottom: "1.5rem",
// // //   borderRadius: "12px",
// // //   border: "1.5px solid #3e3c5c",
// // //   background: "#2a2745",
// // //   color: "#fafaff",
// // //   fontSize: "1.1rem",
// // //   outline: "none",
// // //   boxSizing: "border-box",
// // // }}

// // //           />
// // //           <input
// // //             type="password"
// // //             placeholder="Password"
// // //             value={form.password}
// // //             onChange={(e) => setForm({ ...form, password: e.target.value })}
// // //             required
// // //             style={{
// // //   width: "100%",
// // //   padding: "1rem 1.1rem",
// // //   marginBottom: "1.5rem",
// // //   borderRadius: "12px",
// // //   border: "1.5px solid #3e3c5c",
// // //   background: "#2a2745",
// // //   color: "#fafaff",
// // //   fontSize: "1.1rem",
// // //   outline: "none",
// // //   boxSizing: "border-box",
// // // }}
// // //           />

// // //           <button
// // //             type="submit"
// // //             disabled={loading}
// // //            style={{
// // //   width: "100%",
// // //   padding: "1rem 0",
// // //   fontWeight: "bold",
// // //   fontSize: "1.1rem",
// // //   borderRadius: "12px",
// // //   border: "none",
// // //   color: "#fff",
// // //   background: loading
// // //     ? "linear-gradient(90deg, #90cdf4, #b2f5ea)"
// // //     : "linear-gradient(90deg, #7f4ae8 0%, #9158e8 100%)",
// // //   cursor: loading ? "not-allowed" : "pointer",
// // //   boxShadow: loading
// // //     ? "none"
// // //     : "0 6px 16px rgba(127, 74, 232, 0.25)",
// // //   opacity: loading ? 0.7 : 1,
// // //   transition: "background 0.2s ease",
// // //   boxSizing: "border-box",
// // // }}
// // //           >
// // //             {loading ? "Logging in..." : "Login"}
// // //           </button>
// // //         </form>

// // //         <div style={{ marginTop: "1.5rem", textAlign: "center" }}>
// // //           <p style={{ marginBottom: "0.6rem", color: "#bcbbcc" }}>
// // //             Don’t have an account?
// // //           </p>
// // //           <button
// // //             onClick={() => navigate("/")}
// // //             style={{
// // //               background: "none",
// // //               border: "none",
// // //               color: "#7f4ae8",
// // //               textDecoration: "underline",
// // //               fontSize: "1rem",
// // //               fontWeight: "500",
// // //               cursor: "pointer",
// // //               padding: 0,
// // //             }}
// // //           >
// // //             Sign Up
// // //           </button>
// // //         </div>

// // //         <hr
// // //           style={{
// // //             margin: "2rem 0",
// // //             borderColor: "#3e3a56",
// // //             opacity: 0.25,
// // //             borderWidth: "1px",
// // //           }}
// // //         />

// // //         <div style={{ textAlign: "center" }}>
// // //           <GoogleLogin
// // //             onSuccess={handleGoogleSuccess}
// // //             onError={() => setError("Google login failed.")}
// // //           />
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // }
// // import React, { useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import { useGoogleLogin } from "@react-oauth/google";
// // import { FcGoogle } from "react-icons/fc";

// // export default function Login() {
// //   const [form, setForm] = useState({ username: "", password: "" });
// //   const [error, setError] = useState("");
// //   const [loading, setLoading] = useState(false);
// //   const navigate = useNavigate();

// //   // ---- Normal Username/Password Login ----
// //   const handleLogin = async (e) => {
// //     e.preventDefault();
// //     setError("");
// //     setLoading(true);

// //     try {
// //       const res = await fetch(
// //         "https://ts-techy-crud-1.onrender.com/api/auth/login/",
// //         {
// //           method: "POST",
// //           headers: { "Content-Type": "application/json" },
// //           body: JSON.stringify(form),
// //         }
// //       );

// //       if (res.ok) {
// //         const data = await res.json();

// //         localStorage.setItem("access", data.access);
// //         localStorage.setItem("refresh", data.refresh);
// //         localStorage.setItem("role", data.role);

// //         if (data.role === "admin") {
// //           navigate("/admin");
// //         } else {
// //           navigate("/user");
// //         }
// //       } else {
// //         const errData = await res.json();
// //         setError("Login failed: " + (errData.detail || "Invalid credentials"));
// //       }
// //     } catch (err) {
// //       setError("Login failed: " + err.message);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   // ---- Google Login ----
// //   const googleLogin = useGoogleLogin({
// //     onSuccess: async (tokenResponse) => {
// //       try {
// //         const res = await fetch(
// //           "https://ts-techy-crud-1.onrender.com/api/social/google/",
// //           {
// //             method: "POST",
// //             headers: { "Content-Type": "application/json" },
// //             body: JSON.stringify({ token: tokenResponse.access_token }),
// //           }
// //         );

// //         if (res.ok) {
// //           const data = await res.json();

// //           localStorage.setItem("access", data.access);
// //           localStorage.setItem("refresh", data.refresh);
// //           localStorage.setItem("role", data.role);

// //           if (data.role === "admin") {
// //             navigate("/admin");
// //           } else {
// //             navigate("/user");
// //           }
// //         } else {
// //           setError("Google login failed.");
// //         }
// //       } catch (err) {
// //         setError("Google login failed: " + err.message);
// //       }
// //     },
// //     onError: () => setError("Google login failed."),
// //   });

// //   return (
// //     <div
// //       style={{
// //         position: "fixed",
// //         top: 0,
// //         left: 0,
// //         width: "100vw",
// //         height: "100vh",
// //         background: "linear-gradient(135deg, #493264 0%, #261942 100%)",
// //         display: "flex",
// //         justifyContent: "center",
// //         alignItems: "center",
// //         fontFamily: "Segoe UI, Arial, sans-serif",
// //       }}
// //     >
// //       <div
// //         style={{
// //           maxWidth: "430px",
// //           width: "100%",
// //           background: "#222036",
// //           borderRadius: "18px",
// //           padding: "2.5rem 3rem",
// //           boxShadow: "0 4px 16px rgba(0, 0, 0, 0.1)",
// //           display: "flex",
// //           flexDirection: "column",
// //           color: "#fafaff",
// //         }}
// //       >
// //         <h2
// //           style={{
// //             textAlign: "center",
// //             marginBottom: "1.5rem",
// //             fontWeight: "bold",
// //             fontSize: "2rem",
// //           }}
// //         >
// //           Login
// //         </h2>

// //         {error && (
// //           <p
// //             style={{
// //               color: "#ff4d6d",
// //               backgroundColor: "#fff0f0",
// //               padding: "0.8rem",
// //               borderRadius: "8px",
// //               marginBottom: "1.5rem",
// //               textAlign: "center",
// //               fontWeight: "500",
// //             }}
// //           >
// //             {error}
// //           </p>
// //         )}

// //         <form onSubmit={handleLogin}>
// //           <input
// //             type="text"
// //             placeholder="Username"
// //             value={form.username}
// //             onChange={(e) => setForm({ ...form, username: e.target.value })}
// //             required
// //             style={{
// //               width: "100%",
// //               padding: "1rem 1.1rem",
// //               marginBottom: "1.5rem",
// //               borderRadius: "12px",
// //               border: "1.5px solid #3e3c5c",
// //               background: "#2a2745",
// //               color: "#fafaff",
// //               fontSize: "1.1rem",
// //             }}
// //           />
// //           <input
// //             type="password"
// //             placeholder="Password"
// //             value={form.password}
// //             onChange={(e) => setForm({ ...form, password: e.target.value })}
// //             required
// //             style={{
// //               width: "100%",
// //               padding: "1rem 1.1rem",
// //               marginBottom: "1.5rem",
// //               borderRadius: "12px",
// //               border: "1.5px solid #3e3c5c",
// //               background: "#2a2745",
// //               color: "#fafaff",
// //               fontSize: "1.1rem",
// //             }}
// //           />

// //           <button
// //             type="submit"
// //             disabled={loading}
// //             style={{
// //               width: "100%",
// //               padding: "1rem 0",
// //               fontWeight: "bold",
// //               fontSize: "1.1rem",
// //               borderRadius: "12px",
// //               border: "none",
// //               color: "#fff",
// //               background: loading
// //                 ? "linear-gradient(90deg, #90cdf4, #b2f5ea)"
// //                 : "linear-gradient(90deg, #7f4ae8 0%, #9158e8 100%)",
// //               cursor: loading ? "not-allowed" : "pointer",
// //               boxShadow: "0 6px 16px rgba(127, 74, 232, 0.25)",
// //               opacity: loading ? 0.7 : 1,
// //             }}
// //           >
// //             {loading ? "Logging in..." : "Login"}
// //           </button>
// //         </form>

// //         <div style={{ marginTop: "1.5rem", textAlign: "center" }}>
// //           <p style={{ marginBottom: "0.6rem", color: "#bcbbcc" }}>
// //             Don’t have an account?
// //           </p>
// //           <button
// //             onClick={() => navigate("/")}
// //             style={{
// //               background: "none",
// //               border: "none",
// //               color: "#7f4ae8",
// //               textDecoration: "underline",
// //               fontSize: "1rem",
// //               fontWeight: "500",
// //               cursor: "pointer",
// //             }}
// //           >
// //             Sign Up
// //           </button>
// //         </div>

// //         <hr
// //           style={{
// //             margin: "2rem 0",
// //             borderColor: "#3e3a56",
// //             opacity: 0.25,
// //             borderWidth: "1px",
// //           }}
// //         />

// //         {/* ✅ Custom Google Login Button */}
// //         <div style={{ textAlign: "center" }}>
// //           <button
// //             onClick={() => googleLogin()}
// //             style={{
// //               width: "100%",
// //               display: "flex",
// //               alignItems: "center",
// //               justifyContent: "center",
// //               gap: "10px",
// //               background: "#fff",
// //               color: "#333",
// //               fontWeight: "500",
// //               fontSize: "1rem",
// //               borderRadius: "12px",
// //               border: "1px solid #ddd",
// //               padding: "0.8rem",
// //               cursor: "pointer",
// //               transition: "all 0.2s ease",
// //             }}
// //           >
// //             <FcGoogle size={22} />
// //             Continue with Google
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { GoogleLogin } from "@react-oauth/google";

// export default function Login() {
//   const [form, setForm] = useState({ username: "", password: "" });
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   // ---- Normal Username/Password Login ----
//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);

//     try {
//       const res = await fetch("https://ts-techy-crud-1.onrender.com/api/auth/login/", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(form),
//       });

//       if (res.ok) {
//         const data = await res.json();

//         localStorage.setItem("access", data.access);
//         localStorage.setItem("refresh", data.refresh);
//         localStorage.setItem("role", data.role);

//         if (data.role === "admin") {
//           navigate("/admin");
//         } else {
//           navigate("/user");
//         }
//       } else {
//         const errData = await res.json();
//         setError("Login failed: " + (errData.detail || "Invalid credentials"));
//       }
//     } catch (err) {
//       setError("Login failed: " + err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ---- Google Login ----
//   const handleGoogleSuccess = async (credentialResponse) => {
//     try {
//       const res = await fetch("https://ts-techy-crud-1.onrender.com/api/social/google/", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ token: credentialResponse.credential }),
//       });

//       if (res.ok) {
//         const data = await res.json();

//         localStorage.setItem("access", data.access);
//         localStorage.setItem("refresh", data.refresh);
//         localStorage.setItem("role", data.role);

//         if (data.role === "admin") {
//           navigate("/admin");
//         } else {
//           navigate("/user");
//         }
//       } else {
//         setError("Google login failed.");
//       }
//     } catch (err) {
//       setError("Google login failed: " + err.message);
//     }
//   };

//   return (
//     <div
//       style={{
//         position: "fixed",
//         top: 0,
//         left: 0,
//         width: "100vw",
//         height: "100vh",
//         background: "linear-gradient(135deg, #493264 0%, #261942 100%)",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         overflow: "hidden", // disables scroll bar
//         fontFamily: "Segoe UI, Arial, sans-serif",
//         padding: 0,
//         margin: 0,
//       }}
//     >
//       <div
//         style={{
//           maxWidth: "430px",
//           width: "100%",
//           background: "#222036",
//           borderRadius: "18px",
//           padding: "2.5rem 3rem",
//           boxShadow: "0 4px 16px rgba(0, 0, 0, 0.1)",
//           display: "flex",
//           flexDirection: "column",
//           color: "#fafaff",
//         }}
//       >
//         <h2
//           style={{
//             textAlign: "center",
//             marginBottom: "1.5rem",
//             fontWeight: "bold",
//             fontSize: "2rem",
//           }}
//         >
//           Login
//         </h2>

//         {error && (
//           <p
//             style={{
//               color: "#ff4d6d",
//               backgroundColor: "#fff0f0",
//               padding: "0.8rem",
//               borderRadius: "8px",
//               marginBottom: "1.5rem",
//               textAlign: "center",
//               fontWeight: "500",
//             }}
//           >
//             {error}
//           </p>
//         )}

//         <form onSubmit={handleLogin}>
//           <input
//             type="text"
//             placeholder="Username"
//             value={form.username}
//             onChange={(e) => setForm({ ...form, username: e.target.value })}
//             required
//             style={{
//               width: "100%",
//               padding: "1rem 1.1rem",
//               marginBottom: "1.5rem",
//               borderRadius: "12px",
//               border: "1.5px solid #3e3c5c",
//               background: "#2a2745",
//               color: "#fafaff",
//               fontSize: "1.1rem",
//               outline: "none",
//               boxSizing: "border-box",
//             }}
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             value={form.password}
//             onChange={(e) => setForm({ ...form, password: e.target.value })}
//             required
//             style={{
//               width: "100%",
//               padding: "1rem 1.1rem",
//               marginBottom: "1.5rem",
//               borderRadius: "12px",
//               border: "1.5px solid #3e3c5c",
//               background: "#2a2745",
//               color: "#fafaff",
//               fontSize: "1.1rem",
//               outline: "none",
//               boxSizing: "border-box",
//             }}
//           />

//           <button
//             type="submit"
//             disabled={loading}
//             style={{
//               width: "100%",
//               padding: "1rem 0",
//               fontWeight: "bold",
//               fontSize: "1.1rem",
//               borderRadius: "12px",
//               border: "none",
//               color: "#fff",
//               background: loading
//                 ? "linear-gradient(90deg, #90cdf4, #b2f5ea)"
//                 : "linear-gradient(90deg, #7f4ae8 0%, #9158e8 100%)",
//               cursor: loading ? "not-allowed" : "pointer",
//               boxShadow: loading
//                 ? "none"
//                 : "0 6px 16px rgba(127, 74, 232, 0.25)",
//               opacity: loading ? 0.7 : 1,
//               transition: "background 0.2s ease",
//               boxSizing: "border-box",
//             }}
//           >
//             {loading ? "Logging in..." : "Login"}
//           </button>
//         </form>

//         <div style={{ marginTop: "1.5rem", textAlign: "center" }}>
//           <p style={{ marginBottom: "0.6rem", color: "#bcbbcc" }}>
//             Don’t have an account?
//           </p>
//           <button
//             onClick={() => navigate("/")}
//             style={{
//               background: "none",
//               border: "none",
//               color: "#7f4ae8",
//               textDecoration: "underline",
//               fontSize: "1rem",
//               fontWeight: "500",
//               cursor: "pointer",
//               padding: 0,
//             }}
//           >
//             Sign Up
//           </button>
//         </div>

//         <hr
//           style={{
//             margin: "2rem 0",
//             borderColor: "#3e3a56",
//             opacity: 0.25,
//             borderWidth: "1px",
//           }}
//         />

//         <div style={{ textAlign: "center" }}>
//           <GoogleLogin
//             onSuccess={handleGoogleSuccess}
//             onError={() => setError("Google login failed.")}
//             theme="filled_blue"
//             size="large"
//             width="300"
//             shape="pill"
//           />
//         </div>
//       </div>
//     </div>
//   );
// }
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";

export default function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // ---- Normal Username/Password Login ----
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("https://ts-techy-crud-1.onrender.com/api/auth/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        const data = await res.json();
        localStorage.setItem("access", data.access);
        localStorage.setItem("refresh", data.refresh);
        localStorage.setItem("role", data.role);

        if (data.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/user");
        }
      } else {
        const errData = await res.json();
        setError("Login failed: " + (errData.detail || "Invalid credentials"));
      }
    } catch (err) {
      setError("Login failed: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // ---- Google Login ----
  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const res = await fetch("https://ts-techy-crud-1.onrender.com/api/social/google/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: credentialResponse.credential }),
      });

      if (res.ok) {
        const data = await res.json();
        localStorage.setItem("access", data.access);
        localStorage.setItem("refresh", data.refresh);
        localStorage.setItem("role", data.role);

        if (data.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/user");
        }
      } else {
        setError("Google login failed.");
      }
    } catch (err) {
      setError("Google login failed: " + err.message);
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
        overflow: "hidden",
        fontFamily: "Segoe UI, Arial, sans-serif",
        padding: 0,
        margin: 0,
      }}
    >
      <div
        style={{
          maxWidth: "430px",
          width: "100%",
          background: "#222036",
          borderRadius: "18px",
          padding: "2.5rem 3rem",
          boxShadow: "0 4px 16px rgba(0, 0, 0, 0.1)",
          display: "flex",
          flexDirection: "column",
          color: "#fafaff",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "1.5rem",
            fontWeight: "bold",
            fontSize: "2rem",
          }}
        >
          Login
        </h2>

        {error && (
          <p
            style={{
              color: "#ff4d6d",
              backgroundColor: "#fff0f0",
              padding: "0.8rem",
              borderRadius: "8px",
              marginBottom: "1.5rem",
              textAlign: "center",
              fontWeight: "500",
            }}
          >
            {error}
          </p>
        )}

        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            required
            style={{
              width: "100%",
              padding: "1rem 1.1rem",
              marginBottom: "1.5rem",
              borderRadius: "12px",
              border: "1.5px solid #3e3c5c",
              background: "#2a2745",
              color: "#fafaff",
              fontSize: "1.1rem",
              outline: "none",
              boxSizing: "border-box",
            }}
          />
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
            style={{
              width: "100%",
              padding: "1rem 1.1rem",
              marginBottom: "1.5rem",
              borderRadius: "12px",
              border: "1.5px solid #3e3c5c",
              background: "#2a2745",
              color: "#fafaff",
              fontSize: "1.1rem",
              outline: "none",
              boxSizing: "border-box",
            }}
          />

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "1rem 0",
              fontWeight: "bold",
              fontSize: "1.1rem",
              borderRadius: "12px",
              border: "none",
              color: "#fff",
              background: loading
                ? "linear-gradient(90deg, #90cdf4, #b2f5ea)"
                : "linear-gradient(90deg, #7f4ae8 0%, #9158e8 100%)",
              cursor: loading ? "not-allowed" : "pointer",
              boxShadow: loading
                ? "none"
                : "0 6px 16px rgba(127, 74, 232, 0.25)",
              opacity: loading ? 0.7 : 1,
              transition: "background 0.2s ease",
              boxSizing: "border-box",
            }}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div style={{ marginTop: "1.5rem", textAlign: "center" }}>
          <p style={{ marginBottom: "0.6rem", color: "#bcbbcc" }}>
            Don’t have an account?
          </p>
          <button
            onClick={() => navigate("/")}
            style={{
              background: "none",
              border: "none",
              color: "#7f4ae8",
              textDecoration: "underline",
              fontSize: "1rem",
              fontWeight: "500",
              cursor: "pointer",
              padding: 0,
            }}
          >
            Sign Up
          </button>
        </div>

        <hr
          style={{
            margin: "2rem 0",
            borderColor: "#3e3a56",
            opacity: 0.25,
            borderWidth: "1px",
          }}
        />

        {/* FIXED: Set minWidth and width on the parent */}
        <div style={{ width: "100%", minWidth: "0", display: "flex", justifyContent: "center" }}>
          <div style={{ width: "100%", maxWidth: "340px" }}>
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => setError("Google login failed.")}
              theme="filled_blue"
              size="large"
              width="100%" // always use full width
              shape="pill"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
