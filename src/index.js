import React from "react";
import { createRoot } from "react-dom/client";

import App from "./App";
import "./index.scss";
// import Sidebar from "./components/Sidebar";
import "@fontsource/poppins";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";
import { Provider } from "react-redux";
import { store } from "./todolistComponents/store/store";
const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

const electron = window.electron;

// const mySidebarElement = document.getElementById("mySidebar");
// const mySidebar = createRoot(mySidebarElement);
// mySidebar.render(<Sidebar />);
root.render(
  <Provider store={store}>
    <App electron={electron} />
  </Provider>
);
