import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
// import "bootswatch/dist/cosmo/bootstrap.css";
// import "./styles/styles.css";
import "./input.css";
import "@fortawesome/fontawesome-free/css/all.css";

const rootElement = document.getElementById("root") as HTMLElement;
const root = ReactDOM.createRoot(rootElement);
root.render(<App />);
