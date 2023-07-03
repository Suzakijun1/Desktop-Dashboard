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
import wf from "./config/workflows.json";
import deepEqual from "deep-equal";

export default function App({ electron }) {
  const [workflowList, setWorkflowList] = useState(wf);
  const [isLeftMenuActive, setIsLeftMenuActive] = useState(true);
  const [workflow, setWorkflow] = useState(workflowList[0]);

  const toggleLeftMenu = () => {
    setIsLeftMenuActive((prevIsLeftMenuActive) => !prevIsLeftMenuActive);
  };

  useEffect(() => {
    if (deepEqual(workflowList[workflow.id - 1], workflow)) return;
    workflowList[workflow.id - 1] = workflow;
    electron.writeFile(
      "./src/config/workflows.json",
      JSON.stringify(workflowList)
    );
  }, [workflow]);

  return (
    <div>
      <MemoryRouter>
        <Navbar electron={electron} toggleLeftMenu={toggleLeftMenu} />
        <div className="mainApp">
          <Sidebar
            isLeftMenuActive={isLeftMenuActive}
            workflowList={workflowList}
            toggleLeftMenu={toggleLeftMenu}
            setWorkflow={setWorkflow}
            setWorkflowList={setWorkflowList}
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
                      workflow={workflow}
                      setWorkflow={setWorkflow}
                    />
                  }
                />
                <Route exact path="/todolist" element={<ToDoList />} />
              </Routes>
            </div>
          </div>
        </div>
      </MemoryRouter>
    </div>
  );
}
