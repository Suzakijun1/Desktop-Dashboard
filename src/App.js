import React, { useState, useEffect } from "react";
// import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
// import { Home } from "./pages/Home";
import Playtest from "./pages/Playtest.js";
import "./styles/styles.css";
import DragAndDrop from "./components/DragAndDrop";
import FileOpenButton from "./components/FileOpenButton";

export default function App({ electron }) {
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
  const [isMaximizedApp, setIsMaximizedApp] = useState(false);

  const toggleLeftMenu = () => {
    setIsLeftMenuActive((prevIsLeftMenuActive) => !prevIsLeftMenuActive);
  };

  const handleCloseApp = () => {
    electron.closeApp();
  };

  const handleMinimizeApp = () => {
    electron.minimizeApp();
  };

  const handleMaximizeRestoreApp = () => {
    electron.maximizeRestoreApp();
  };

  const changeMaxResBtn = (isMaximizedApp) => {
    const maxResBtn = document.getElementById("maxResBtn");

    if (isMaximizedApp) {
      maxResBtn.title = "Restore";
      maxResBtn.classList.remove("maximizeBtn");
      maxResBtn.classList.add("restoreBtn");
    } else {
      maxResBtn.title = "Maximize";
      maxResBtn.classList.remove("restoreBtn");
      maxResBtn.classList.add("maximizeBtn");
    }
  };

  useEffect(() => {
    electron.onMaximized(() => {
      changeMaxResBtn(true);
      setIsMaximizedApp(true);
    });

    electron.onRestored(() => {
      changeMaxResBtn(false);
      setIsMaximizedApp(false);
    });
  }, []);
  useEffect(() => {
    const showHideMenus = document.getElementById("showHideMenus");
    const mySidebar = document.getElementById("mySidebar");
    let isLeftMenuActive = true;

    showHideMenus.addEventListener("click", () => {
      if (isLeftMenuActive) {
        mySidebar.style.width = "0px";
        isLeftMenuActive = false;
      } else {
        mySidebar.style.width = "280px";
        isLeftMenuActive = true;
      }
    });
  }, []);
  const maxResBtnClass = isMaximizedApp ? "restoreBtn" : "maximizeBtn";
  const maxResBtnTitle = isMaximizedApp ? "Restore" : "Maximize";

  return (
    // <Router>
    <div className="mainApp">
      <div className="topBar">
        <div className="titleBar">
          <button
            id="showHideMenus"
            className="toggleButton"
            onClick={toggleLeftMenu}
          ></button>
          <img src="./src/icons/icon_top_bar.png" alt="" />
          <div className="title">My App Top Bar</div>
        </div>

        <div className="titleBarBtns">
          <button
            id="minimizeBtn"
            className="topBtn minimizeBtn"
            title="Minimize"
            onClick={handleMinimizeApp}
          ></button>
          <button
            id="maxResBtn"
            className={`topBtn ${maxResBtnClass}`}
            title={maxResBtnTitle}
            onClick={handleMaximizeRestoreApp}
          ></button>
          <button
            id="closeBtn"
            className="topBtn closeBtn"
            title="Close"
            onClick={handleCloseApp}
          ></button>
        </div>
      </div>

      <div className="newNavBar">
        <button id="testing">testing</button>
      </div>

      <div
        className={`contentArea ${isLeftMenuActive ? "" : "sidebar-closed"}`}
      >
        <div id="mySidebar" className="leftMenu">
          {isLeftMenuActive && <button className="button">testing</button>}
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
            <FileOpenButton />
            <button onClick={() => electron.openApp(app.route, app.arguments)}>
              Open Apps in Macro
            </button>
            <DragAndDrop macro={macro} updateMacro={updateMacro} />
          </div>
        </div>
      </div>
    </div>
    /* <Switch>
        <Route path="/playtest" component={Playtest} />
      </Switch>
    </Router> */
  );
}
