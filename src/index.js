import React from "react";
import { createRoot } from "react-dom/client";

import App from "./App";
import "./index.scss";
// import Sidebar from "./components/Sidebar";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

const electron = window.electron;

// const mySidebarElement = document.getElementById("mySidebar");
// const mySidebar = createRoot(mySidebarElement);
// mySidebar.render(<Sidebar />);
root.render(<App electron={electron} />);
