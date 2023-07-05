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
import wf from "./config/workflows.json";
import deepEqual from "deep-equal";
import WidgetManager from "./pages/WidgetManager";

export default function App({ electron }) {
  //Workflow List is the list of all workflows
  //It is initially set to the workflows in workflows.json
  const [workflowList, setWorkflowList] = useState(wf);

  //Tracks if the sidebar is active
  const [isLeftMenuActive, setIsLeftMenuActive] = useState(true);

  //Workflow is keeping track of the current workflow, it is initially set to the first workflow in the list
  const [workflow, setWorkflow] = useState(workflowList[0]);

  //Toggles the sidebar
  const toggleLeftMenu = () => {
    setIsLeftMenuActive((prevIsLeftMenuActive) => !prevIsLeftMenuActive);
  };

  useEffect(() => {
    // if (deepEqual(workflowList[workflow.id - 1], workflow)) return;
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
                      workflowList={workflowList}
                      setWorkflowList={setWorkflowList}
                    />
                  }
                />
                <Route exact path="/todolist" element={<ToDoList />} />
                <Route
                  exact
                  path="/widgets"
                  element={
                    <WidgetManager
                      electron={electron}
                      workflow={workflow}
                      setWorkflow={setWorkflow}
                      workflowList={workflowList}
                      setWorkflowList={setWorkflowList}
                    />
                  }
                />
              </Routes>
            </div>
          </div>
        </div>
      </MemoryRouter>
    </div>
  );
}
