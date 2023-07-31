import React, { useState, useEffect } from "react";
import "./notePreview.css";
import { toast } from "react-toastify";
import ToolBar from "../ToolBar/ToolBar";
import { getCurrentDateTime } from "../Assets/getCurrentDateTime";
import { useOutsideClick } from "../Assets/useOutsideClick";

const NotePreview = ({ note, setIsOpen }) => {
  const notePreviewModalNode = useOutsideClick(() => setIsOpen(false));
  const [notes, setNotes] = useState({
    id: note.id,
    title: note.title,
    content: note.content,
    bg: note.bg,
    label: note.label,
    archived: note.archived,
    deleted: note.deleted,
    pinned: note.pinned,
  });

  // Update local state when the note prop changes
  useEffect(() => {
    setNotes({
      id: note.id,
      title: note.title,
      content: note.content,
      bg: note.bg,
      label: note.label,
      archived: note.archived,
      deleted: note.deleted,
      pinned: note.pinned,
    });
  }, [note]);
  // const [notes, setNotes] = useState([]);
  // Load notes data from localStorage on component mount
  useEffect(() => {
    const savedNoteData = localStorage.getItem("notes");
    if (savedNoteData) {
      setNotes(JSON.parse(savedNoteData));
    }
  }, []);

  // Save notes data to localStorage on every update
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
    console.log("Note Preview Use Effect");
  }, [note.id, notes]);

  // Load notes data from localStorage on component mount
  // useEffect(() => {
  //   const savedNoteData = localStorage.getItem("notes");
  //   if (savedNoteData) {
  //     setNotes(JSON.parse(savedNoteData));
  //   }
  // }, [note.id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNotes((prevNotes) => {
      const updatedNoteIndex = prevNotes.findIndex(
        (noteItem) => noteItem.id === note.id
      );
      if (updatedNoteIndex !== -1) {
        const updatedNote = {
          ...prevNotes[updatedNoteIndex],
          [name]: value,
          editedAt: getCurrentDateTime(),
        };
        const updatedNotes = [...prevNotes];
        updatedNotes[updatedNoteIndex] = updatedNote;
        localStorage.setItem("notes", JSON.stringify(updatedNotes));
        return updatedNotes;
      }
      return prevNotes;
    });
  };

  const updateNote = (id, value) => {
    try {
      // Get the existing notes data from localStorage
      const savedNoteData = localStorage.getItem("notes");
      const notes = savedNoteData ? JSON.parse(savedNoteData) : {};

      // Update the note with the given id
      if (notes[id]) {
        notes[id] = {
          ...notes[id],
          ...value,
          editedAt: getCurrentDateTime(),
        };

        // Save the updated notes data back to localStorage
        localStorage.setItem("notes", JSON.stringify(notes));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const deleteNote = (id) => {
    try {
      // Get the existing notes data from localStorage
      const savedNoteData = localStorage.getItem("notes");
      const notes = savedNoteData ? JSON.parse(savedNoteData) : {};

      // Delete the note with the given id
      if (notes[id]) {
        delete notes[id];

        // Save the updated notes data back to localStorage
        localStorage.setItem("notes", JSON.stringify(notes));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const changeBg = (bg) => {
    setNotes((prevNote) => ({ ...prevNote, bg }));
  };

  const pinNote = () => {
    updateNote(note.id, { pinned: !note.pinned });

    setIsOpen(false);
  };

  const binNote = () => {
    try {
      // Get the existing notes data from localStorage
      const savedNoteData = localStorage.getItem("notes");
      let notes = savedNoteData ? JSON.parse(savedNoteData) : [];

      // Filter out the note with the given id
      notes = notes.filter((noteItem) => noteItem.id !== note.id);

      // Save the updated notes data back to localStorage
      localStorage.setItem("notes", JSON.stringify(notes));

      // Here, you don't need to update the local state (notes) because it will be automatically updated
      // when the effect hook runs due to changes in localStorage

      toast.success("Note Deleted!");
      setIsOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  const archiveNote = () => {
    updateNote(note.id, { archived: !note.archived });
    toast.success("Note Archived!");

    setIsOpen(false);
  };

  const unarchiveNote = () => {
    updateNote(note.id, { archived: !note.archived });
    toast.success("Note Unarchived");

    setIsOpen(false);
  };

  const restoreNote = () => {
    updateNote(note.id, { deleted: !note.deleted });
    toast.success("Note Restored!");
    setIsOpen(false);
  };

  const deleteNoteForever = () => {
    deleteNote(note.id);
    toast.success("Note deleted forever!");
    setIsOpen(false);
  };

  const closeModal = () => {
    setUpdatedNote();
    setIsOpen(false);
    toast.success("Note is updated!");
  };

  const deleteLabel = (labelName) => {
    setNotes((prevNote) => ({
      ...prevNote,
      label: prevNote.label.filter((l) => l !== labelName),
    }));

    // Update localStorage for the changes
    const updatedLabels = notes.label.filter((l) => l !== labelName);
    localStorage.setItem(
      `note_${note.id}_label`,
      JSON.stringify(updatedLabels)
    );
  };

  const addNewLabel = (labelName) => {
    if (
      labelName.trim() !== "" &&
      !note.label.includes(labelName.trim().toLowerCase())
    ) {
      setNotes((prevNote) => ({
        ...prevNote,
        label: [...prevNote.label, labelName.trim().toLowerCase()],
      }));

      // Update localStorage for the changes
      const updatedLabels = [...notes.label, labelName.trim().toLowerCase()];
      localStorage.setItem(
        `note_${note.id}_label`,
        JSON.stringify(updatedLabels)
      );
    }
  };

  const setUpdatedNote = () => {
    const updatedNote = { ...note }; // Create a copy of the original note object
    for (let key in notes) {
      // Check if the notes object contains the key from the original note
      if (key in updatedNote) {
        if (notes[key].toString() !== updatedNote[key].toString()) {
          updatedNote[key] = notes[key];
        }
      }
    }
    updateNote(note.id, updatedNote);
  };

  return (
    <div className="new-note-modal-container">
      <div className={`new-note-modal ${notes.bg}`} ref={notePreviewModalNode}>
        <div className="new-note-container">
          <input
            type="text"
            placeholder="Title"
            name="title"
            className="title"
            value={notes.title}
            disabled={notes.deleted}
            onChange={handleChange}
          />
          <textarea
            placeholder="Take a note..."
            name="content"
            className="content"
            disabled={notes.deleted}
            value={notes.content}
            onChange={handleChange}
          />
          <ToolBar
            newNote={notes}
            closeModal={closeModal}
            changeBg={changeBg}
            binNote={binNote}
            archiveNote={archiveNote}
            unarchiveNote={unarchiveNote}
            pinNote={pinNote}
            restoreNote={restoreNote}
            deleteNoteForever={deleteNoteForever}
            deleteLabel={deleteLabel}
            addNewLabel={addNewLabel}
          />
        </div>
      </div>
    </div>
  );
};

export default NotePreview;
