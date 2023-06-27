import React from 'react';
import { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './DragAndDrop.css'
import { useEffect } from 'react';



export default function DragAndDrop({macro, updateMacro}) {
    

    function handleOnDragEnd(result) {
        if (!result.destination) return;
        const items = Array.from(macro);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        updateMacro(items);

    }

    useEffect(() => {
        console.log(macro)
    }, [macro]);



    return (
        <DragDropContext onDragEnd={handleOnDragEnd}>
            <h2 className='macro-header'>Current Macro</h2>
            <Droppable droppableId="macro" direction='horizontal'>
                {(provided) => (
                    <ul
                        className="macro"
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                    >
                        {macro.map(({ id, name }, index) => {
                            return (
                                <Draggable key={id} draggableId={id} index={index}>
                                    {(provided) => (
                                        <li
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            ref={provided.innerRef}
                                        >
                                            {index+1 + ". " + name}
                                            <button className='delete-button' onClick={() => {
                                                const items = Array.from(macro);
                                                items.splice(index, 1);
                                                updateMacro(items);
                                            }}>X</button>
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

    )
}