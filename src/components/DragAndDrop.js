import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./DragAndDrop.css";
import { MdDelete, MdEdit } from "react-icons/md";
import styles from "../styles/modules/todoItem.module.scss";
import { AnimatePresence, motion } from "framer-motion";
import UpdateMacroButton from "./UpdateMacroButton";

export default function DragAndDrop({ workflow, setWorkflow }) {
  function handleOnDragEnd(result) {
    if (!result.destination) return;
    const items = Array.from(workflow.macro);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setWorkflow((oldWorkflow) => {
      return {
        ...oldWorkflow,
        macro: items,
      };
    });
  }

  useEffect(() => {
    console.log(workflow);
  }, [workflow.macro]);
  const deleteMacro = (index) => {
    setWorkflow((oldWorkflow) => {
      const updatedMacro = [...oldWorkflow.macro];
      updatedMacro.splice(index, 1);

      // Update the IDs by incrementing them
      const updatedMacroWithIds = updatedMacro.map((item, idx) => ({
        ...item,
        id: (idx + 1).toString(),
      }));

      return {
        ...oldWorkflow,
        macro: updatedMacroWithIds,
      };
    });
  };
  return (
    <AnimatePresence>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        {/* <h2 className="macro-header">{workflow.name}'s Current Macro</h2> */}
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
                    {(provided) => {
                      return (
                        <motion.li
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          ref={provided.innerRef}
                          className={styles.item}
                          key={id}
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
                            <div className={styles.icon}>
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
                      );
                    }}
                  </Draggable>
                ))}

                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </motion.div>
      </DragDropContext>
    </AnimatePresence>
  );
}
