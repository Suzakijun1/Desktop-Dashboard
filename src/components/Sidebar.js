import React, { useEffect, useState } from "react";
import Button from "../todolistComponents/Button";

export default function Sidebar({
  isLeftMenuActive,
  workflowList,
  setWorkflow,
  setWorkflowList,
}) {
  const [newItemName, setNewItemName] = useState("");
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
  const addNewItem = () => {
    // Create a new item object with the user's input as the name
    const newItem = {
      name: newItemName, // Use the user's input as the name
      id: workflowList.length + 1,
      macro: [],
    };

    // Update the workflowList state by creating a new array with the new item appended
    setWorkflowList([...workflowList, newItem]);
    setWorkflow(newItem);
    // Reset the newItemName state variable to clear the input field
    setNewItemName("");
  };
  return (
    <div id="mySidebar" className="leftMenu">
      <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        <div className="leftMenuHeader">Saved Workflows</div>
        {workflowList.map((workflow, index) => (
          <Button
            variant="primary"
            key={index}
            onClick={() => setWorkflow(workflow)}
          >
            {workflow.name}
          </Button>
        ))}
        <input
          type="text"
          value={newItemName}
          onChange={(e) => setNewItemName(e.target.value)}
          placeholder="Enter item name"
        />
        <Button variant="primary" onClick={addNewItem} disabled={!newItemName}>
          Add Item
        </Button>
      </div>
    </div>
  );
}
