import React, { useState } from "react";
import "./note.css";
import NotePreview from "../NotePreview/NotePreview";

const Note = ({ note, binNote, setNotes }) => {
  const [isOpen, setIsOpen] = useState(false);

  const updateNoteInParent = (updatedNote) => {
    console.log("Note Updated");
    console.log(updatedNote);
    setNotes((prevNotes) => {
      return prevNotes.map((note) => {
        if (note.id === updatedNote.id) {
          return updatedNote;
        } else {
          return note;
        }
      });
    });
  };

  // const updateNoteInParent = (updatedNote) => {
  //   console.log("Note Updated");
  //   console.log(updatedNote);
  //   setNotes(
  //     (prevNotes) =>
  //       prevNotes
  //         .map((note) => {
  //           if (note.id === updatedNote.id) {
  //             if (updatedNote.deleted) {
  //               // If the note is marked for deletion, return null to filter it out
  //               return null;
  //             } else {
  //               // Otherwise, update the note
  //               return updatedNote;
  //             }
  //           } else {
  //             return note;
  //           }
  //         })
  //         .filter(Boolean) // Filter out null notes
  //   );
  // };

  // const updateNoteInParent = (updatedNote) => {
  //   setNotes((prevNotes) => ({
  //     ...prevNotes,
  //     [updatedNote.id]: updatedNote,
  //   }));
  // };
  return (
    <div className="note-card-container">
      <div className={`note-card ${note?.bg}`} onClick={() => setIsOpen(true)}>
        <div className="note-content">
          <h3>{note?.title}</h3>
          <p>{note?.content}</p>
        </div>
        {note?.label?.length !== 0 && (
          <div className="note-label-container">
            {[...note?.label].map((label) => (
              <span key={label}>{label}</span>
            ))}
          </div>
        )}
        {note?.editedAt ? (
          <p>Edited At: {note?.editedAt}</p>
        ) : (
          <p>Created At: {note?.createdAt}</p>
        )}
      </div>
      {isOpen && (
        <NotePreview
          note={note}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          binNote={binNote}
          updateNoteInParent={updateNoteInParent}
          setNotes={setNotes}
        />
      )}
    </div>
  );
};

export default Note;
