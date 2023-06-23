import React from 'react';
import { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './DragAndDrop.css'



export default function DragAndDrop() {
    const [characters, updateCharacters] = useState([
        {
            id: '1',
            name: 'Luke Skywalker',
        },
        {
            id: '2',
            name: 'Yoda',
        },
        {
            id: '3',
            name: 'Obi-Wan Kenobi',
        },
        {
            id: '4',
            name: 'Darth Vader',
        },
    ])

    function handleOnDragEnd(result) {
        if (!result.destination) return;
        const items = Array.from(characters);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        updateCharacters(items);

    }



    return (
        <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="characters" direction='horizontal'>
                {(provided) => (
                    <ul
                        className="characters"
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                    >
                        {characters.map(({ id, name }, index) => {
                            return (
                                <Draggable key={id} draggableId={id} index={index}>
                                    {(provided) => (
                                        <li
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            ref={provided.innerRef}
                                        >
                                            {name}
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