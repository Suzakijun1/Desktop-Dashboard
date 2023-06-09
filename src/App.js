import React, { useState, useEffect } from "react";
import {
  MemoryRouter,
  HashRouter,
  Routes,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import Flow from "./pages/Flow";
import Navbar from "./components/Navbar";
import WeatherPage from "./pages/WeatherPage.js";
import Email from "./pages/Email.js";
import ToDoList from "./pages/ToolsItems/ToDoList.js";
import Sidebar from "./components/Sidebar";
import Clipboard from "./pages/ToolsItems/Clipboard";
import Tools from "./pages/Tools.js";
import "./styles/styles.css";
import wf from "./config/workflows.json";
import deepEqual from "deep-equal";

export default function App({ electron, ipcRenderer }) {
  const [modalOpen, setModalOpen] = useState(false);
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
            electron={electron}
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
                <Route exact path="/weather" element={<WeatherPage />} />
                <Route
                  exact
                  path="/"
                  element={
                    <Flow
                      electron={electron}
                      workflow={workflow}
                      setWorkflow={setWorkflow}
                      workflowList={workflowList}
                      setWorkflowList={setWorkflowList}
                      modalOpen={modalOpen}
                      setModalOpen={setModalOpen}
                    />
                  }
                />
                <Route exact path="/todolist" element={<ToDoList />} />
                <Route exact path="/tools" element={<Tools />} />
                <Route exact path="/clipboard" element={<Clipboard />} />
                <Route
                  exact
                  path="email"
                  element={
                    <Email electron={electron} ipcRenderer={ipcRenderer} />
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
