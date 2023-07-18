import React, { useState, useEffect } from "react";
import DragAndDrop from "../components/FlowComponents/DragAndDrop";
import FileOpenButton from "../components/FlowComponents/FileOpenButton";
import RunMacroButton from "../components/FlowComponents/RunMacroButton";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import AddToMacroButton from "../components/FlowComponents/AddToMacroButton";
import styles from "../styles/modules/app.module.scss";
import Navbar from "../components/Navbar";
import Button from "../todolistComponents/Button";
import DeleteModal from "../components/FlowComponents/DeleteModal";

export default function Flow({
  electron,
  workflow,
  setWorkflow,
  workflowList,
  setWorkflowList,
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false); // State for delete modal
  const handleDeleteWorkflow = () => {
    setDeleteModalOpen(true); // Open delete modal
  };

  const handleConfirmDelete = () => {
    const updatedWorkflowList = workflowList.filter(
      (item) => item.id !== workflow.id
    );

    // Update the IDs of the remaining workflows in order
    const updatedWorkflowListWithIDs = updatedWorkflowList.map(
      (item, index) => ({
        ...item,
        id: index + 1,
      })
    );

    setWorkflowList(updatedWorkflowListWithIDs);

    // Set the current workflow to the first workflow in the updated list
    setWorkflow(updatedWorkflowListWithIDs[0]);
    setDeleteModalOpen(false); // Close delete modal
  };

  return (
    <div
      className="container"
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{ width: "100%" }}>
        <div
          style={{
            height: "100%",
            width: "100%",
            maxWidth: "750px",
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            gap: "2rem",
          }}
        >
          <h1>Macro Flow</h1>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <Button
                variant="primary"
                id="macro"
                onClick={() => setModalOpen(true)}
              >
                Add to Macro
              </Button>
              <AddToMacroButton
                modalOpen={modalOpen}
                setModalOpen={setModalOpen}
                workflow={workflow}
                setWorkflow={setWorkflow}
                setWorkflowList={setWorkflowList}
              />
            </div>
            <div>
              <RunMacroButton workflow={workflow} electron={electron} />
            </div>
          </div>
          <DragAndDrop
            // modalOpen={modalOpen}
            // setModalOpen={setModalOpen}
            workflow={workflow}
            setWorkflow={setWorkflow}
            setWorkflowList={setWorkflowList}
          />
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
        {/* Delete Modal */}
        {deleteModalOpen && (
          <DeleteModal
            deleteModalOpen={deleteModalOpen}
            setDeleteModalOpen={setDeleteModalOpen}
            handleConfirmDelete={handleConfirmDelete}
          />
        )}
      </div>
    </div>
  );
}
