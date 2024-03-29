import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { MdDelete, MdEdit } from "react-icons/md";
import styles from "../../styles/modules/todoItem.module.scss";
import { AnimatePresence, motion } from "framer-motion";
import UpdateMacroButton from "./UpdateMacroButton";

export default function DragAndDrop({
  workflow,
  setWorkflow,
  setWorkflowList,
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingMacroIndex, setEditingMacroIndex] = useState(null);
  const [editedName, setEditedName] = useState("");
  const [editedRoute, setEditedRoute] = useState("");
  const [editedArgs, setEditedArgs] = useState("");

  function handleOnDragEnd(result) {
    if (!result.destination) return;
    const items = Array.from(workflow.macro);
    const [reorderedItem] = items.splice(result.source.index, 1);

    items.splice(result.destination.index, 0, reorderedItem);

    setWorkflow((oldWorkflow) => ({
      ...oldWorkflow,
      macro: items,
    }));

    // Update the workflowList state
    setWorkflowList((oldWorkflowList) => {
      const updatedWorkflowList = [...oldWorkflowList];
      updatedWorkflowList[workflow.id - 1].macro = items;

      return updatedWorkflowList;
    });
  }

  useEffect(() => {
    console.log(workflow);
  }, [workflow.macro]);

  const deleteMacro = (index) => {
    setWorkflow((oldWorkflow) => {
      const updatedMacro = [...oldWorkflow.macro];
      updatedMacro.splice(index, 1);

      //Update the workflowList state after deleting a macro
      setWorkflowList((oldWorkflowList) => {
        const updatedWorkflowList = [...oldWorkflowList];
        updatedWorkflowList[workflow.id - 1].macro = updatedMacro;

        return updatedWorkflowList;
      });
      return {
        ...oldWorkflow,
        macro: updatedMacro,
      };
    });
  };

  const openEditModal = (index) => {
    setEditingMacroIndex(index);
    const selectedMacro = workflow.macro[index];
    console.log("Editing macro with id:", selectedMacro.id);
    setEditedName(selectedMacro.name);
    setEditedRoute(selectedMacro.route);
    setEditedArgs(selectedMacro.arguments.join(" ")); // Set the initial value of editedArgs
    setModalOpen(true);
  };

  const handleModalSave = () => {
    // Update the edited macro in the workflow
    setWorkflow((oldWorkflow) => {
      const updatedMacro = [...oldWorkflow.macro];
      updatedMacro[editingMacroIndex].name = editedName;
      updatedMacro[editingMacroIndex].route = editedRoute;
      updatedMacro[editingMacroIndex].arguments = editedArgs.split(" "); // Update the arguments
      setWorkflowList((oldWorkflowList) => {
        const updatedWorkflowList = [...oldWorkflowList];
        updatedWorkflowList[workflow.id - 1].macro = updatedMacro;

        return updatedWorkflowList;
      });
      return {
        ...oldWorkflow,
        macro: updatedMacro,
      };
    });
    setModalOpen(false);
  };
  useEffect(() => {
    console.log("Workflow Macro IDs:");
    workflow.macro.forEach((item) => {
      console.log(item.id);
    });
  }, [workflow.macro]);
  return (
    <AnimatePresence>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <motion.div
          className={styles.content__wrapper}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <h2
            className="macro-header"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              color: "black",
            }}
          >
            {workflow.name}'s Current Macro
          </h2>
          <Droppable droppableId="macro" className={styles.texts}>
            {(provided) => (
              <ul
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={{ listStyleType: "none" }}
              >
                {workflow.macro.map(({ id, name }, index) => (
                  <Draggable key={id} draggableId={id} index={index}>
                    {(provided) => (
                      <motion.li
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        className={styles.item}
                        key={`macro-${id}`} // Assign a unique key here
                      >
                        <span
                          style={{
                            color: "var(--black-2)",
                            fontWeight: "bold",
                          }}
                        >
                          {index + 1}. {name}
                        </span>

                        <div className={styles.todoActions}>
                          <div
                            className={styles.icon}
                            onClick={() => openEditModal(index)}
                          >
                            <MdEdit />
                          </div>

                          <div
                            className={styles.icon}
                            onClick={() => {
                              deleteMacro(index);
                            }}
                          >
                            <MdDelete />
                          </div>
                        </div>
                      </motion.li>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </motion.div>
      </DragDropContext>
      {modalOpen && (
        <UpdateMacroButton
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          editedName={editedName}
          setEditedName={setEditedName}
          editedRoute={editedRoute}
          setEditedRoute={setEditedRoute}
          editedArgs={editedArgs} // Pass editedArgs as prop
          setEditedArgs={setEditedArgs} // Pass setEditedArgs as prop
          handleModalSave={handleModalSave}
        />
      )}
    </AnimatePresence>
  );
}
