
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { GoogleOAuthProvider } from "@react-oauth/google";

ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId="410937695116-g6rcv4h67emhh1kg3cdpkbm7jsn3skbr.apps.googleusercontent.com">
    <App />
  </GoogleOAuthProvider>
);

