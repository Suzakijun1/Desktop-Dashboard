import React, { useState, useEffect } from "react";
import {
  HashRouter,
  Switch,
  Route,
  Link,
  Routes,
  Router,
} from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Playtest from "./pages/Playtest.js";
import ToDoList from "./pages/ToDoList.js";
import Sidebar from "./components/Sidebar";
import "./styles/styles.css";

// import Home from "./pages/Home";

export default function App({ electron }) {
  const [isLeftMenuActive, setIsLeftMenuActive] = useState(true);
  const [macro, updateMacro] = useState([
    {
      id: "1",
      name: "Chrome",
      route: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
      arguments: ["https://www.google.com"],
    },
    {
      id: "2",
      name: "Mozilla Firefox",
      route: "C:\\Program Files\\Mozilla Firefox\\firefox.exe",
      arguments: ["https://www.google.com"],
    },
    {
      id: "3",
      name: "Notepad",
      route: "C:\\Windows\\notepad.exe",
      arguments: [],
    },
  ]);

  const toggleLeftMenu = () => {
    setIsLeftMenuActive((prevIsLeftMenuActive) => !prevIsLeftMenuActive);
  };

  return (
    <div>
      <HashRouter>
        <Navbar
          electron={electron}
          toggleLeftMenu={toggleLeftMenu}
          isLeftMenuActive={isLeftMenuActive}
          macro={macro}
          updateMacro={updateMacro}
        />
        <div className="mainApp">
          <Sidebar
            isLeftMenuActive={isLeftMenuActive}
            toggleLeftMenu={toggleLeftMenu}
          />
          <div
            className={`contentArea ${
              isLeftMenuActive ? "" : "sidebar-closed"
            }`}
          >
            <div className="contentPages">
              <Routes>
                <Route exact path="/" element={<Playtest />} />
                <Route
                  exact
                  path="/macro"
                  element={
                    <Home
                      electron={electron}
                      macro={macro}
                      updateMacro={updateMacro}
                    />
                  }
                />
                <Route exact path="/todolist" element={<ToDoList />} />
              </Routes>
            </div>
          </div>
        </div>
      </HashRouter>
    </div>
  );
}
