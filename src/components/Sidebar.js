import React, { useEffect, useState } from "react";
import Button from "../todolistComponents/Button";
import { Link, useHistory } from "react-router-dom";

export default function Sidebar({ isLeftMenuActive }) {
  const [workflows, setWorkflows] = useState(["Work", "Gaming", "Other"]);
  const [newWorkflowName, setNewWorkflowName] = useState("");
  //   const history = useHistory();
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
      handleWorkflowSelect(newWorkflowName);
      //   history.push(`/workflow/${newWorkflowName}`);
    }
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
          <Link key={index} to={`/workflow/${workflow}`}>
            <Button key={index} variant="primary">
              {workflow}
            </Button>
          </Link>
        ))}
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
