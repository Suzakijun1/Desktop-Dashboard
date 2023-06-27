import React, { useState, useEffect } from "react";
import Weather from "../components/Weather";
import Navbar from "../components/Navbar";

export default function Playtest() {
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
          <>
            <div className="leftMenuHeader">Saved Macros</div>

            <button className="button">a macro button</button>
          </>
        </div>

        <div className="contentPages">
          <Weather />
          <button onClick={() => window.history.back()}>Go Back</button>
        </div>
      </div>
    </div>
  );
}
