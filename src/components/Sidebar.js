import React, { useEffect, useState } from "react";
import Button from "../todolistComponents/Button";
import TestFlow from "../pages/TestFlow";

export default function Sidebar({ isLeftMenuActive, updateMainWindow }) {
  const [workflows, setWorkflows] = useState(["Work", "Gaming", "Other"]);
  const [newWorkflowName, setNewWorkflowName] = useState("");
  const [selectedWorkflow, setSelectedWorkflow] = useState("");

  const [showTestFlow, setShowTestFlow] = useState(false);

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

  const handleAddWorkflow = () => {
    if (newWorkflowName.trim() !== "") {
      setWorkflows([...workflows, newWorkflowName]);
      setNewWorkflowName("");
      setSelectedWorkflow(newWorkflowName);
    }
  };

  const performActionBasedOnSelectedWorkflow = (workflow) => {
    setSelectedWorkflow(workflow);
    setShowTestFlow(true);
    updateMainWindow(`New content for ${workflow}`);
    console.log("updated main window content" + updateMainWindow);
  };
  return (
    <div id="mySidebar" className="leftMenu" style={{ minHeight: "90vh" }}>
      <div className="leftMenuHeader">Saved Workflows</div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          minHeight: "85vh",
        }}
      >
        {workflows.map((workflow, index) => (
          <Button
            key={index}
            variant="primary"
            onClick={() => {
              setSelectedWorkflow(workflow);
              console.log("button clicked");
              console.log(workflow);
              performActionBasedOnSelectedWorkflow(workflow);
            }}
          >
            {workflow}
          </Button>
        ))}
        {showTestFlow && <TestFlow workflow={selectedWorkflow} />}
        <div
          className="addWorkflow-button"
          style={{ marginTop: "auto", display: "flex" }}
        >
          <input
            type="text"
            value={newWorkflowName}
            onChange={(e) => setNewWorkflowName(e.target.value)}
            placeholder="New Workflow Name"
          />
          <Button variant="primary" onClick={handleAddWorkflow}>
            Add Macro
          </Button>
        </div>
      </div>
    </div>
  );
}
