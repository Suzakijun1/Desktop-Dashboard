import React, { useState, useEffect } from "react";
// import fs from "fs";
// import path from "path";
import Widget from "../components/Widget";
import wf from "../config/widgets.json";
import WidgetModal from "../components/WidgetModal";
import Button from "../todolistComponents/Button";
import Weather from "../components/Weather";
import { useSelector } from "react-redux";
import { Responsive, WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import ToDoList from "./ToDoList";
function WidgetManager({
  electron,
  workflow,
  setWorkflow,
  workflowList,
  setWorkflowList,
}) {
  const ResponsiveGridLayout = WidthProvider(Responsive);
  // Determines the screen breakpoints for the columns
  const breakpoints = { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 320 };
  // How many columns are available at each breakpoint
  const cols = { lg: 2, md: 2, sm: 1, xs: 1, xxs: 1 };

  const [widgets, setWidgets] = useState(wf);
  const [showModal, setShowModal] = useState(false);
  const selectedWidget = useSelector((state) => state.widgets.selectedWidget); // Retrieve selectedWidget from Redux store
  const layouts = {
    lg: [
      { i: "1", x: 0, y: 0, w: 6, h: 2, static: false },
      { i: "2", x: 2, y: 0, w: 6, h: 2, static: false },
      { i: "3", x: 0, y: 2, w: 6, h: 2, static: false },
    ],
    md: [
      { i: "1", x: 0, y: 0, w: 6, h: 2, static: false },
      { i: "2", x: 2, y: 0, w: 6, h: 2, static: false },
      { i: "3", x: 0, y: 2, w: 6, h: 2, static: false },
    ],
  };
  useEffect(() => {
    saveWidgets();
  }, [selectedWidget]);

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
      electron.writeFile(
        "./src/config/widgets.json",
        JSON.stringify(selectedWidget)
      );
      console.log(
        "Selected Widgets saved successfully!" + JSON.stringify(selectedWidget)
      );
    } catch (error) {
      console.error("Error saving selected widgets:", error);
    }
  };

  const addWidget = (newWidget) => {
    // Logic to add a new widget

    setShowModal(false);
    saveWidgets(); // Save widgets after adding a new one
  };
  console.log("Selected Widgets:", selectedWidget);

  // const removeWidget = (index) => {
  //   // Logic to remove a widget
  //   const updatedWidgets = [...widgets];
  //   updatedWidgets.splice(index, 1);
  //   setWidgets(updatedWidgets);
  //   saveWidgets(); // Save widgets after removing one
  // };

  return (
    <div className="container">
      <h1>{workflow.name} Widget Manager</h1>

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
      />
      <ResponsiveGridLayout
        className="layout"
        // style={{ backgroundColor: "white", width: "700px" }}
        layouts={layouts}
        breakpoints={breakpoints}
        cols={cols}
        width={2400}
        autoSize
      >
        <div key="1" style={{ width: "100%", height: "100%" }}>
          {selectedWidget.includes(2) && (
            <Weather style={{ width: "100%", height: "100%" }} />
          )}
        </div>
        <div key="2" style={{ width: "100%", height: "100%" }}>
          {selectedWidget.includes(1) && <ToDoList />}
        </div>

        {/* {selectedWidget > 0 ? (
            selectedWidget.map((widgetId) => {
              if (widgetId === 2) {
                return (
                  <div key={1} style={{ width: "100%", height: "100%" }}>
                    Weather Widget
                    <Weather />
                  </div>
                );
              }
              // Add more conditions for other widget components
              return null;
            })
          ) : (
            <p>No widgets selected.</p>
          )} */}
        <div key="3">handleWidgetSelection</div>
      </ResponsiveGridLayout>
    </div>

    /* <div>
        <h1>Selected Widgets:</h1>
        {selectedWidget && selectedWidget.length > 0 ? (
          <ul>
            {selectedWidget.map((widgetId) => (
              <li key={widgetId}>{widgetId}</li>
            ))}
          </ul>
        ) : (
          <p>No widgets selected.</p>
        )}
      </div> */
  );
}

export default WidgetManager;
