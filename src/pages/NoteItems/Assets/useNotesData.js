import React, { useState, useEffect } from "react";

const useNotesData = () => {
  const [notes, setNotes] = useState([]);

  // Load notes from localStorage on initial mount
  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem("notes"));
    if (Array.isArray(savedNotes)) {
      setNotes(savedNotes);
    } else {
      console.log("No notes found in localStorage");
      setNotes([]); // If savedNotes is not an array (e.g., null), set it to an empty array
    }
  }, []);

  // Update localStorage when notes change
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
    console.log("notes updated");
  }, [notes]);

  useEffect(() => {
    console.log("notes:", notes);
  }, [notes]);
  // Log the value of 'deleted' whenever it changes
  // useEffect(() => {
  //   console.log("Deleted Notes:", deleted);
  // }, [deleted]);

  const addNewNote = (newNote) => {
    setNotes((prevNotes) => [...prevNotes, newNote]);
  };

  // Filter notes and create separate state variables for each category
  const allNotes = notes;
  const deleted = allNotes.filter((note) => note.deleted === true);
  const archived = allNotes.filter(
    (note) => note.archived === true && note.deleted === false
  );
  const labeledNotes = allNotes.filter((note) => note.label?.length !== 0);
  const pinned = allNotes.filter(
    (note) =>
      note.deleted === false && note.archived === false && note.pinned === true
  );
  const unpinned = allNotes.filter(
    (note) =>
      note.deleted === false && note.archived === false && note.pinned === false
  );

  return {
    notes,
    deleted,
    archived,
    labeledNotes,
    pinned,
    unpinned,
    notes,
    setNotes, // Also return the setter function to update notes externally if needed
    addNewNote,
  };
};

export default useNotesData;
