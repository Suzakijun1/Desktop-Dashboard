import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Button from "../todolistComponents/Button";
import { Toaster } from "react-hot-toast";
import AppContent from "../../src/todolistComponents/AppContent";
import AppHeader from "../../src/todolistComponents/AppHeader";
import PageTitle from "../../src/todolistComponents/PageTitle";
import styles from "../styles/modules/app.module.scss";

const ToDoList = () => {
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
      <Navbar electron={electron} toggleLeftMenu={toggleLeftMenu} />
      <div
        className={`contentArea ${isLeftMenuActive ? "" : "sidebar-closed"}`}
      >
        <div id="mySidebar" className="leftMenu">
          <div style={{display : "flex", flexDirection: "column"}}>
            <div className="leftMenuHeader">Saved Macros</div>

            {/* <button className="button">a macro button</button> */}
            <Button variant="primary">Work</Button>
            <Button variant="primary">Gaming</Button>
            <Button variant="primary">Other</Button>
          </div>
        </div>
        <div className="contentPages">
          <div className="container">
            <PageTitle>TODO List</PageTitle>
            <div className={styles.app__wrapper}>
              <AppHeader />
              <AppContent />
            </div>
          </div>
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                fontSize: "1.4rem",
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ToDoList;
