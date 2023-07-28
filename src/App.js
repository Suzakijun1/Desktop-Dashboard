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
import deepEqual from "deep-equal";
import Notes from "./pages/Notes";

export default function App({ electron, ipcRenderer, appPath }) {
  const [modalOpen, setModalOpen] = useState(false);
  //Workflow List is the list of all workflows
  //It is initially set to the workflows in workflows.json

  const [workflowList, setWorkflowList] = useState(
    // Retrieve data from "workflowList" key in localStorage and parse it
    JSON.parse(localStorage.getItem("workflowList")) || [
      // Default value if no data found or parsing fails
      {
        name: "Work",
        id: 1,
        macro: [
          {
            id: "b765d3a1-c303-420d-b13b-9fec7f3b7de9",
            name: "notepad2",
            route: "C:\\Windows\\notepad.exe",
            arguments: [""],
          },
        ],
      },
    ]
  );
  // Update localStorage whenever the workflowList changes
  useEffect(() => {
    localStorage.setItem("workflowList", JSON.stringify(workflowList));
    console.log("newitem in workflowList", workflowList);
    console.log("newitem in workflow", workflow);
  }, [workflowList, workflow]);

  //Tracks if the sidebar is active
  const [isLeftMenuActive, setIsLeftMenuActive] = useState(true);

  //Workflow is keeping track of the current workflow, it is initially set to the first workflow in the list
  const [workflow, setWorkflow] = useState(workflowList[0]);

  //Toggles the sidebar
  const toggleLeftMenu = () => {
    setIsLeftMenuActive((prevIsLeftMenuActive) => !prevIsLeftMenuActive);
  };

  return (
    <div>
      <MemoryRouter>
        <Navbar electron={electron} toggleLeftMenu={toggleLeftMenu} />
        <div className="mainApp">
          {workflow && (
            <Sidebar
              electron={electron}
              isLeftMenuActive={isLeftMenuActive}
              workflowList={workflowList}
              toggleLeftMenu={toggleLeftMenu}
              setWorkflow={setWorkflow}
              setWorkflowList={setWorkflowList}
            />
          )}
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
                    workflow && (
                      <Flow
                        electron={electron}
                        workflow={workflow}
                        setWorkflow={setWorkflow}
                        workflowList={workflowList}
                        setWorkflowList={setWorkflowList}
                        modalOpen={modalOpen}
                        setModalOpen={setModalOpen}
                      />
                    )
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
                <Route exact path="/notes" element={<Notes />} />
              </Routes>
            </div>
          </div>
        </div>
      </MemoryRouter>
    </div>
  );
}
