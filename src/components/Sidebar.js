import React, { useEffect, useState } from "react";
import Button from "../todolistComponents/Button";
import TestFlow from "../pages/TestFlow";

export default function Sidebar({ isLeftMenuActive, workflows , setWorkflow}) {

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
                {workflows.map((workflow) => 
                    <Button variant="primary" onClick={() => setWorkflow(workflow)}> {workflow.name} </Button>
                )}
            </div>
        </div>
    );  
}
