import React, { useState, useEffect } from "react";
import {
  MemoryRouter,
  HashRouter,
  Routes,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Playtest from "./pages/Playtest.js";
import ToDoList from "./pages/ToDoList.js";
import Sidebar from "./components/Sidebar";
import "./styles/styles.css";
import TestFlow from "./pages/TestFlow";
// import {useHistory} from "react-router"
// import Home from "./pages/Home";

export default function App({ electron }) {
  const [selectedWorkflow, setSelectedWorkflow] = useState("");

  const [mainWindowContent, setMainWindowContent] = useState("Default content");
  const updateMainWindow = (newContent) => {
    setMainWindowContent(newContent);
  };
  const handleWorkflowSelect = (workflow) => {
    setSelectedWorkflow(workflow);
    updateMainWindow(`New content for ${workflow}`);
  };
  console.log("selectedWorkflow", selectedWorkflow);
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
      <MemoryRouter>
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
            updateMainWindow={updateMainWindow}
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
                <Route
                  exact
                  // path="/workflow/:workflowName"
                  element={<TestFlow />}
                />
              </Routes>
            </div>
          </div>
        </div>
      </MemoryRouter>
    </div>
  );
}
