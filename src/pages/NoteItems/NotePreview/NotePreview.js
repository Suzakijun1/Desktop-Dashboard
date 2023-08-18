import React, { useState, useEffect } from "react";
import "./notePreview.css";
import { toast } from "react-toastify";
import ToolBar from "../ToolBar/ToolBar";
import { getCurrentDateTime } from "../Assets/getCurrentDateTime";
import { useOutsideClick } from "../Assets/useOutsideClick";

const NotePreview = ({ note, setIsOpen, updateNoteInParent }) => {
  const notePreviewModalNode = useOutsideClick(() => setIsOpen(false));
  const [notes, setNotes] = useState({ ...note }); // Initialize with the values from 'note' prop

  // Update local state when the note prop changes
  useEffect(() => {
    setNotes({ ...note }); // Update the local state with the values from 'note' prop
  }, [note]);

  // Save notes data to localStorage on every update
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedNote = {
      ...note,
      [name]: value,
      editedAt: getCurrentDateTime(),
    };
    // localStorage.setItem("notes", JSON.stringify(updatedNote));
    updateNoteInParent(updatedNote);
  };

  //might need this function in the future to delete a note permanently.
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

        // Remove the note from local state as well
        setNotes((prevNotes) => {
          const updatedNotes = { ...prevNotes };
          delete updatedNotes[id];
          return updatedNotes;
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const changeBg = (bg) => {
    updateNoteInParent({ ...note, bg });
  };

  const pinNote = () => {
    updateNoteInParent({ ...note, pinned: !note.pinned });

    setIsOpen(false);
  };

  const binNote = () => {
    try {
      // Mark the current note for deletion
      const updatedNote = {
        ...note,
        deleted: true,
      };

      // Call the updateNoteInParent function with the updatedNote
      updateNoteInParent(updatedNote);

      toast.success("Note Deleted!");
      setIsOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  const archiveNote = () => {
    updateNoteInParent({ ...note, archived: !note.archived });
    toast.success("Note Archived!");

    setIsOpen(false);
  };

  const unarchiveNote = () => {
    updateNoteInParent({ ...note, archived: !note.archived });
    toast.success("Note Unarchived");

    setIsOpen(false);
  };

  const restoreNote = () => {
    updateNoteInParent({ ...note, deleted: !note.deleted });
    toast.success("Note Restored!");
    setIsOpen(false);
  };

  // const deleteNoteForever = () => {
  //   deleteNote(note.id);
  //   toast.success("Note deleted forever!");
  //   setIsOpen(false);
  // };

  const deleteNoteForever = () => {
    try {
      // Delete the note from local state and localStorage
      updateNoteInParent(note, true);

      toast.success("Note deleted forever!");
      setIsOpen(false);
    } catch (err) {
      console.error(err);
    }
  };
  const closeModal = () => {
    // setUpdatedNote();
    updateNoteInParent({ ...note, editedAt: getCurrentDateTime() });
    setIsOpen(false);
    toast.success("Note is updated!");
  };

  const deleteLabel = (labelName) => {
    updateNoteInParent({
      ...note,
      label: note.label.filter((l) => l !== labelName),
    });

    // Update localStorage for the changes
    const updatedLabels = notes.label.filter((l) => l !== labelName);
    localStorage.setItem(`notes`, JSON.stringify(updatedLabels));
  };

  const addNewLabel = (labelName) => {
    if (
      labelName.trim() !== "" &&
      !note.label.includes(labelName.trim().toLowerCase())
    ) {
      updateNoteInParent({
        ...note,
        label: [...note.label, labelName.trim().toLowerCase()],
      });

      // Update localStorage for the changes
      const updatedLabels = [...notes.label, labelName.trim().toLowerCase()];
      localStorage.setItem(`notes`, JSON.stringify(updatedLabels));
    }
  };

  // const setUpdatedNote = () => {
  //   const updatedNote = { ...note }; // Create a copy of the original note object
  //   for (let key in notes) {
  //     // Check if the notes object contains the key from the original note
  //     if (key in updatedNote) {
  //       if (notes[key].toString() !== updatedNote[key].toString()) {
  //         updatedNote[key] = notes[key];
  //       }
  //     }
  //   }
  //   updateNote(note.id, updatedNote);
  // };

  // const setUpdatedNote = () => {
  //   for (let key in notes) {
  //     if (notes[key].toString() !== note[key].toString()) {
  //       updateNote(note.id, { [key]: notes[key] });
  //     }
  //   }
  // };
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
