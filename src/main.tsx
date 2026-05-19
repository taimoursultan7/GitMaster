import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import GitMaster from "./GitMaster";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GitMaster />
  </StrictMode>
);
