import React, { useState, useEffect } from "react";
import DragAndDrop from "../components/DragAndDrop";
import FileOpenButton from "../components/FileOpenButton";
import RunMacroButton from "../components/RunMacroButton";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import AddToMacroButton from "../components/AddToMacroButton";
import Navbar from "../components/Navbar";
import Button from "../todolistComponents/Button";
// const Store = require("electron-store");

// const path = require("path");
// const fs = require("fs");

// const store = new Store();


export default function Home({ electron }) {
  const [modalOpen, setModalOpen] = useState(false);
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

  const [isLeftMenuActive, setIsLeftMenuActive] = useState(true);

  const toggleLeftMenu = () => {
    setIsLeftMenuActive((prevIsLeftMenuActive) => !prevIsLeftMenuActive);
  };

  useEffect(() => {
    const showHideMenus = document.getElementById("showHideMenus");
    const mySidebar = document.getElementById("mySidebar");
    let isLeftMenuActive = true;

    showHideMenus.addEventListener("click", () => {
      if (isLeftMenuActive) {
        mySidebar.style.left = "-240px";
        isLeftMenuActive = false;
      } else {
        mySidebar.style.left = "0px";
        isLeftMenuActive = true;
      }
    });
  }, []);

  return (
    <div className="mainApp">
      <Navbar macro={macro}
        updateMacro={updateMacro}
        electron={electron}
        toggleLeftMenu={toggleLeftMenu} />

      <div
        className={`contentArea ${isLeftMenuActive ? "" : "sidebar-closed"}`}
      >
        <div id="mySidebar" className="leftMenu">
        <div style={{display : "flex", flexDirection: "column"}}>
            <div className="leftMenuHeader">Saved Workflow</div>

            {/* <button className="button">a macro button</button> */}
            <div><Button variant="primary">Work</Button><Button>Run Macro</Button></div>
            <Button variant="primary">Gaming</Button>
            <Button variant="primary">Other</Button>
          </div>
        </div>

        <div className="contentPages">
          <div className="container">
            <h1>Welcome to my Macro Dashboard!</h1>
            <button
              onClick={() =>
                electron.notificationApi.sendNotification(
                  "My custom notification!!"
                )
              }
            >
              Notify
            </button>
            <RunMacroButton macro={macro} />
            <Button variant="primary" id="macro" onClick={() => setModalOpen(true)}>
              Add to Macro
            </Button>
            <AddToMacroButton modalOpen={modalOpen} setModalOpen={setModalOpen} macro={macro} updateMacro={updateMacro} />
            <FileOpenButton />
            <DragAndDrop macro={macro} updateMacro={updateMacro} />
          </div>
        </div>
      </div>
    </div>
  );
}
