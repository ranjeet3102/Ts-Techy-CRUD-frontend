
import axios from "axios";

const api = axios.create({
  baseURL: "https://ts-techy-crud-1.onrender.com",
});

// This interceptor runs BEFORE each request is sent
api.interceptors.request.use((config) => {
  // ✅ Use "access" to match your component code
  const token = localStorage.getItem("access"); 
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ✅ This interceptor runs AFTER a response is received
// It checks for '401 Unauthorized' errors (expired tokens)
api.interceptors.response.use(
  (response) => response, // Pass through successful responses
  (error) => {
    // If the server responds with a 401 error
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      // Redirect to the login page
      window.location.href = "/login";
    }
    // Return any other errors
    return Promise.reject(error);
  }
);

export default api;