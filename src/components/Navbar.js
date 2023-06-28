import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export default function Navbar({ electron }) {
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

  const maxResBtnClass = isMaximizedApp ? "restoreBtn" : "maximizeBtn";
  const maxResBtnTitle = isMaximizedApp ? "Restore" : "Maximize";

  return (
    <>
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
        <Link to="/">
          <button id="home"> Home </button>
        </Link>
        <Link to="/playtest">
          <button id="testing">PlayTest Button</button>
        </Link>
        <Link to="/todolist">
          <button id="toDoList">To Do List</button>
        </Link>
      </div>
    </>
  );
}