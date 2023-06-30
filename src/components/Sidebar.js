import React, { useEffect } from "react";
import Button from "../todolistComponents/Button";

export default function Sidebar({ isLeftMenuActive }) {
    useEffect(() => {
        const showHideMenus = document.getElementById("showHideMenus");
        const mySidebar = document.getElementById("mySidebar");

        showHideMenus.addEventListener("click", () => {
            if (isLeftMenuActive) {
                mySidebar.style.left = "-240px";
                isLeftMenuActive = false;

            } else {
                mySidebar.style.display = "block";
                mySidebar.style.left = "0px";
                isLeftMenuActive = true;
            }
        });
    }, []);

    

    return (

        <div id="mySidebar" className="leftMenu">
            <div
                style={{ display: "flex", flexDirection: "column", gap: "15px" }}
            >
                <div className="leftMenuHeader">Saved Workflows</div>
                <Button variant="primary">Work</Button>
                <Button variant="primary">Gaming</Button>
                <Button variant="primary">Other</Button>
            </div>
        </div>
    )
}