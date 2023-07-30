import React, { useState, useEffect } from "react";

const useNotesData = () => {
  const [notes, setNotes] = useState([]);

  // Load notes from localStorage on initial mount
  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
    setNotes(savedNotes);
  }, []);

  // Update localStorage when notes change
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  // Filter notes and create separate state variables for each category
  const deleted = notes.filter((note) => note.deleted === true);
  const archived = notes.filter(
    (note) => note.archived === true && note.deleted === false
  );
  const labeledNotes = notes.filter((note) => note.label?.length !== 0);
  const pinned = notes.filter(
    (note) =>
      note.deleted === false && note.archived === false && note.pinned === true
  );
  const unpinned = notes.filter(
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
    setNotes, // Also return the setter function to update notes externally if needed
  };
};

export default useNotesData;
