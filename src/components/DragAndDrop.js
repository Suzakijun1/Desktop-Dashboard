import React, { useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./DragAndDrop.css";

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
  //Delete Function for Macro
  function handleDeleteItem(index) {
    const updatedItems = [...workflow.macro];
    updatedItems.splice(index, 1);

    setWorkflow((oldWorkflow) => ({
      ...oldWorkflow,
      macro: updatedItems,
    }));
  }
  useEffect(() => {
    console.log(workflow);
  }, [workflow.macro]);

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <h2 className="macro-header">Current Macro</h2>
      <Droppable droppableId="macro" direction="horizontal">
        {(provided) => (
          <ul
            className="macro"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {workflow.macro.map(({ id, name }, index) => {
              return (
                <Draggable key={id} draggableId={id} index={index}>
                  {(provided) => (
                    <li
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                    >
                      {index + 1 + ". " + name}
                      <button
                        className="delete-button"
                        onClick={() => handleDeleteItem(index)}
                      >
                        X
                      </button>
                    </li>
                  )}
                </Draggable>
              );
            })}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
}
