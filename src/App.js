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
import { set } from "date-fns";
// import {useHistory} from "react-router"
// import Home from "./pages/Home";



export default function App({ electron }) {
  const workflows = [
    {
      name: "Work",
      macro: [{
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
      }]
    },
    {
      name: "Gaming",
      macro: [{
        id: "2",
        name: "Reddit",
        route: "C:\\Program Files\\Mozilla Firefox\\firefox.exe",
        arguments: ["https://www.reddit.com"],
      },
      {
        id: "3",
        name: "Notepad",
        route: "C:\\Windows\\notepad.exe",
        arguments: [],
      }]
    },
    {
      name: "Other",
      macro: [
      {
        id: "3",
        name: "Notepad",
        route: "C:\\Windows\\notepad.exe",
        arguments: [],
      }]
    },
  ]
  const [isLeftMenuActive, setIsLeftMenuActive] = useState(true);
  const [workflow, setWorkflow] = useState(workflows[0]);

  const toggleLeftMenu = () => {
    setIsLeftMenuActive((prevIsLeftMenuActive) => !prevIsLeftMenuActive);
  };


  return (
    <div>
      <MemoryRouter>
        <Navbar
          electron={electron}
          toggleLeftMenu={toggleLeftMenu}
        />
        <div className="mainApp">
          <Sidebar
            isLeftMenuActive={isLeftMenuActive}
            workflows={workflows}
            toggleLeftMenu={toggleLeftMenu}
            setWorkflow={setWorkflow}
          />
          <div
            className={`contentArea ${isLeftMenuActive ? "" : "sidebar-closed"
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
