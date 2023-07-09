import React, { useState, useEffect } from "react";
import DragAndDrop from "../components/DragAndDrop";
import FileOpenButton from "../components/FileOpenButton";
import RunMacroButton from "../components/RunMacroButton";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import AddToMacroButton from "../components/AddToMacroButton";
import styles from "../styles/modules/app.module.scss";
import Navbar from "../components/Navbar";
import Button from "../todolistComponents/Button";

export default function Flow({
  electron,
  workflow,
  setWorkflow,
  workflowList,
  setWorkflowList,
}) {
  const [modalOpen, setModalOpen] = useState(false);

  const handleDeleteWorkflow = () => {
    const updatedWorkflowList = workflowList.filter(
      (item) => item.id !== workflow.id
    );

    setWorkflowList(updatedWorkflowList);

    // Set the current workflow to the first workflow in the updated list
    setWorkflow(updatedWorkflowList[0]);
  };

  return (
    <div className="container" style={{ position: "relative" }}>
      <h1>Macro Flow</h1>
      <div className={styles.app__wrapper}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <Button variant="primary" id="macro">
              Add to Macro
            </Button>
            <AddToMacroButton
              modalOpen={modalOpen}
              setModalOpen={setModalOpen}
              workflow={workflow}
              setWorkflow={setWorkflow}
            />
          </div>
          <div>
            <RunMacroButton workflow={workflow} electron={electron} />
          </div>
        </div>
        <DragAndDrop workflow={workflow} setWorkflow={setWorkflow} />
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "10px",
          }}
        >
          <Button variant="danger" onClick={handleDeleteWorkflow}>
            Delete Workflow
          </Button>
        </div>
      </div>
    </div>
  );
}
