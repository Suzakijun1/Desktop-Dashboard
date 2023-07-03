import React, { useEffect, useState } from "react";
import Button from "../todolistComponents/Button";

export default function Sidebar({ isLeftMenuActive, workflowList , setWorkflow}) {

    useEffect(() => {

        //Identifiers for the side bar
        const showHideMenus = document.getElementById("showHideMenus");
        const mySidebar = document.getElementById("mySidebar");


        //Alters position of side bar
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
                {workflowList.map((workflow, index) => 
                    <Button variant="primary" key={index} onClick={() => setWorkflow(workflow)}> {workflow.name} </Button>
                )}
            </div>
        </div>
    );  
}
