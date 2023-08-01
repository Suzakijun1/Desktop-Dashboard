import React, { useState } from "react";
// import Navbar from "../../components/Navbar/navbar";
import Sidebar from "./NoteItems/Sidebar/Sidebar";
import "./Notes.css";
import NewNote from "./NoteItems/NewNote/NewNote";
import useNotesData from "./NoteItems/Assets/useNotesData";
import Note from "./NoteItems/Note/Note";
import Layout from "./NoteItems/Layout/Layout";

const Notes = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { pinned, unpinned, addNewNote, setNotes } = useNotesData();
  const pinnedNotes = pinned.map((note) => (
    <Note key={note.id} note={note} setNotes={setNotes} />
  ));

  const otherNotes = unpinned.map((note) => (
    <Note key={note.id} note={note} setNotes={setNotes} />
  ));
  console.log("pinnedNotes:", pinnedNotes);
  console.log("otherNotes:", otherNotes);
  console.log("isOpen:", isOpen);

  // Function to handle opening the NewNote component for editing
  const handleEditNote = (note) => {
    setNoteToEdit(note); // Set the note being edited in the state
    setIsOpen(true); // Open the NewNote component
  };

  return (
    <div className="notes">
      {/* <Navbar /> */}
      <div className="notes-content">
        {/* <Sidebar /> */}
        <div className="notes-main">
          <section>
            <div>
              <h2>PINNED</h2>
              {pinnedNotes.length !== 0 ? (
                <Layout onEditNote={handleEditNote}>{pinnedNotes}</Layout>
              ) : (
                <p>No pinned notes found!</p>
              )}
            </div>

            <div>
              <h2>OTHERS</h2>
              {otherNotes.length !== 0 ? (
                <Layout onEditNote={handleEditNote}>{otherNotes}</Layout>
              ) : (
                <p>No notes found!</p>
              )}
            </div>
          </section>
          <button
            className="new-note-button"
            onClick={() => setIsOpen(!isOpen)}
          >
            <i className="fa-solid fa-pencil"></i>
          </button>
          {isOpen && <NewNote setIsOpen={setIsOpen} addNewNote={addNewNote} />}
        </div>
      </div>
    </div>
  );
};

export default Notes;
