import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles.css";
import { appWindow } from "@tauri-apps/api/window";

await appWindow.setAlwaysOnTop(true);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
