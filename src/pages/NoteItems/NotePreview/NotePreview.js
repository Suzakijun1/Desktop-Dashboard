import React, { useState } from "react";
import "./notePreview.css";
import { toast } from "react-toastify";
import ToolBar from "../ToolBar/ToolBar";
import { getCurrentDateTime } from "../Assets/getCurrentDateTime";
import { useOutsideClick } from "../Assets/useOutsideClick";

const NotePreview = ({ note, setIsOpen }) => {
  const notePreviewModalNode = useOutsideClick(() => setIsOpen(false));
  const [notes, setNotes] = useState({
    title: note.title,
    content: note.content,
    bg: note.bg,
    label: note.label,
    archived: note.archived,
    deleted: note.deleted,
    pinned: note.pinned,
  });

  useEffect(() => {
    // Save the initial note data to local storage when component mounts
    saveToLocalStorage(note.id, notes);
  }, [note.id, notes]);

  const saveToLocalStorage = (id, data) => {
    try {
      localStorage.setItem(`note_${id}`, JSON.stringify(data));
    } catch (err) {
      console.error(err);
    }
  };

  const updateNote = (id, value) => {
    setNotes((prevNote) => ({ ...prevNote, ...value }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNotes((prevNote) => ({ ...prevNote, [name]: value }));
  };

  const setUpdatedNote = () => {
    try {
      saveToLocalStorage(note.id, notes);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteNote = (id) => {
    try {
      for (let key in notes) {
        localStorage.removeItem(`note_${id}_${key}`);
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
    setUpdatedNote();
    setIsOpen(false);
  };

  const binNote = () => {
    updateNote(note.id, { deleted: !note.deleted });
    toast.success("Note Deleted!");
    setUpdatedNote();
    setIsOpen(false);
  };

  const archiveNote = () => {
    updateNote(note.id, { archived: !note.archived });
    toast.success("Note Archived!");
    setUpdatedNote();
    setIsOpen(false);
  };

  const unarchiveNote = () => {
    updateNote(note.id, { archived: !note.archived });
    toast.success("Note Unarchived");
    setUpdatedNote();
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
