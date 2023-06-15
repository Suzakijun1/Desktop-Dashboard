import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";
import "./index.scss";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

const electron = window.electron;

root.render(
  <StrictMode>
    <App electron={electron} />
  </StrictMode>
);
