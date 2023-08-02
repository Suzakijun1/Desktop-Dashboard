import React from "react";
import { createRoot } from "react-dom/client";
// import { remote } from "electron";
import App from "./App";
import "./index.scss";
// import Sidebar from "./components/Sidebar";
import "@fontsource/poppins";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";
import { Provider } from "react-redux";
import { store } from "./todolistComponents/store/store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

const electron = window.electron;
const ipcRenderer = window.ipcRenderer;
root.render(
  <Provider store={store}>
    <App electron={electron} ipcRenderer={ipcRenderer} />
  </Provider>
);
