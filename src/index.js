import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "bootswatch/dist/cosmo/bootstrap.css";
import "./styles/styles.css";
import "@fortawesome/fontawesome-free/css/all.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
