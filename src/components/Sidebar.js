import React, { useEffect, useState } from "react";
import Button from "../todolistComponents/Button";
import SidebarAddModal from "./SidebarAddModal";

export default function Sidebar({
  isLeftMenuActive,
  workflowList,
  setWorkflow,
  setWorkflowList,
}) {
  // const [newItemName, setNewItemName] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
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
        // mySidebar.style.display = "block";
        mySidebar.style.left = "0px";
        isLeftMenuActive = true;
      }
    });
  }, []);
  const addNewItem = (name) => {
    // Create a new item object with the user's input as the name
    const newItem = {
      name: name, // Use the user's input as the name
      id: workflowList.length + 1,
      macro: [],
    };

    // Update the workflowList state by creating a new array with the new item appended
    setWorkflowList([...workflowList, newItem]);

    // Reset the newItemName state variable to clear the input field
    // setNewItemName("");
  };

  const openModal = () => {
    setModalOpen(true);
  };
  return (
    <div
      id="mySidebar"
      className="leftMenu"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "85vh",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div className="leftMenuHeader">Saved Workflows</div>
        {workflowList.map((workflow, index) => (
          <Button
            variant="primary"
            key={index}
            onClick={() => setWorkflow(workflow)}
            style={{ marginTop: index === 0 ? "0" : "20px" }}
          >
            {workflow.name}
          </Button>
        ))}
      </div>
      {/* <input
          type="text"
          value={newItemName}
          onChange={(e) => setNewItemName(e.target.value)}
          placeholder="Enter item name"
        /> */}
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Button variant="primary" onClick={openModal}>
          Add Item
        </Button>
      </div>

      <SidebarAddModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        onSubmit={(name) => {
          addNewItem(name);
          setModalOpen(false);
        }}
      />
    </div>
  );
}
