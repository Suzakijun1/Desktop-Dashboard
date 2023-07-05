import React, { useState, useEffect } from "react";
// import fs from "fs";
// import path from "path";
import Widget from "../components/Widget";
import wf from "../config/widgets.json";
import WidgetModal from "../components/WidgetModal";
import Button from "../todolistComponents/Button";
import Weather from "../components/Weather";
export default function WidgetManager({
  electron,
  workflow,
  setWorkflow,
  workflowList,
  setWorkflowList,
}) {
  const [widgets, setWidgets] = useState(wf);
  const [showModal, setShowModal] = useState(false);
  const [selectedWidget, setSelectedWidget] = useState(null);
  //   useEffect(() => {
  //     loadWidgets();
  //   }, []);

  //   const loadWidgets = () => {
  //     try {
  //       const widgetsData = fs.readFileSync(path.join(__dirname, "widgets.json"));
  //       const parsedData = JSON.parse(widgetsData);
  //       setWidgets(parsedData);
  //     } catch (error) {
  //       console.error("Error loading widgets:", error);
  //     }
  //   };

  const saveWidgets = () => {
    try {
      electron.writeFile("./src/config/widgets.json", JSON.stringify(widgets));
      console.log("Widgets saved successfully!" + JSON.stringify(widgets));
    } catch (error) {
      console.error("Error saving widgets:", error);
    }
  };

  const addWidget = (newWidget) => {
    // Logic to add a new widget

    setShowModal(false);
    saveWidgets(); // Save widgets after adding a new one
  };

  const removeWidget = (index) => {
    // Logic to remove a widget
    const updatedWidgets = [...widgets];
    updatedWidgets.splice(index, 1);
    setWidgets(updatedWidgets);
    saveWidgets(); // Save widgets after removing one
  };

  return (
    <div>
      <h1>{workflow.name} Widget Manager</h1>

      <div className="widget-container">
        <Button
          variant="primary"
          id="macro"
          onClick={() => {
            setShowModal(true);
            console.log("Add Widget");
          }}
        >
          Add Widget
        </Button>

        <WidgetModal
          modalOpen={showModal}
          setModalOpen={setShowModal}
          addWidget={addWidget}
          widgets={widgets}
          setWidgets={setWidgets}
          selectedWidget={selectedWidget}
          setSelectedWidget={setSelectedWidget}
        />
        {/* Render selected widget */}
        {selectedWidget && selectedWidget.name === "Weather" && <Weather />}
      </div>
    </div>
  );
}
