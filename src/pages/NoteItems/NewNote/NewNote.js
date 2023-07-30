import React, { useContext, useEffect, useState } from "react";
import "./NewNote.css";
import { useOutsideClick } from "../Assets/useOutsideClick";
import ToolBar from "../ToolBar/ToolBar";

import { toast } from "react-toastify";

const NewNote = ({ setIsOpen }) => {
  const newNoteModalNode = useOutsideClick(() => setIsOpen(false));

  const newEmptyNote = {
    title: "",
    content: "",
    label: [],
    archived: false,
    bg: "bg-white",
    deleted: false,
    pinned: false,
  };
  const saveNotesToLocalStorage = (notes) => {
    localStorage.setItem("notes", JSON.stringify(notes));
  };
  const [newNote, setNewNote] = useState(newEmptyNote);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewNote((prev) => ({ ...prev, [name]: value }));
  };

  const addNewNote = () => {
    if (newNote.content === "" && newNote.title === "") {
      toast.error("Can't save an empty note!");
    } else {
      const storedNotes = JSON.parse(localStorage.getItem("notes")) || [];
      const updatedNotes = [...storedNotes, newNote];
      saveNotesToLocalStorage(updatedNotes);
    }
  };

  useEffect(() => {
    // Save the new note when it is not empty
    addNewNote();
    setIsOpen(false);
    toast.success("New note is created!");
  }, [newNote, setIsOpen]);

  const closeModal = () => {
    addNewNote();
    setIsOpen(false);
    toast.success("New note is created!");
  };

  const changeBg = (color) => {
    setNewNote((prev) => ({ ...prev, bg: color }));
  };

  const binNote = () => {
    if (newNote.content === "" && newNote.title === "") {
      toast.error("Can't delete an empty note!");
    } else if (newNote.content !== "" || newNote.title !== "") {
      setNewNote((prev) => ({ ...prev, deleted: true }));
      toast.success("Note Deleted!");
    }
  };

  const archiveNote = () => {
    if (newNote.content === "" && newNote.title === "") {
      toast.error("Can't archive an empty note!");
    } else if (newNote.content !== "" || newNote.title !== "") {
      setNewNote((prev) => ({ ...prev, archived: true }));
      toast.success("Note Archived!");
    }
  };

  const pinNote = () => {
    setNewNote((prev) => ({ ...prev, pinned: !prev.pinned }));
  };

  const deleteLabel = (labelName) => {
    setNewNote((prev) => ({
      ...prev,
      label: prev.label.filter((label) => label !== labelName),
    }));
  };

  const addNewLabel = (labelName) => {
    if (
      labelName.trim() !== "" &&
      !newNote.label.includes(labelName.trim().toLowerCase())
    ) {
      setNewNote((prev) => ({
        ...prev,
        label: [...prev.label, labelName.trim().toLowerCase()],
      }));
    }
  };

  return (
    <div className="new-note-modal-container">
      <div className={`new-note-modal ${newNote?.bg}`} ref={newNoteModalNode}>
        <div className="new-note-container">
          <input
            type="text"
            placeholder="Title"
            name="title"
            className="title"
            value={newNote.title}
            disabled={newNote.deleted}
            onChange={handleChange}
          />
          <textarea
            placeholder="Take a note..."
            name="content"
            className="content"
            disabled={newNote.deleted}
            value={newNote.content}
            onChange={handleChange}
          />
          <ToolBar
            newNote={newNote}
            closeModal={closeModal}
            changeBg={changeBg}
            binNote={binNote}
            archiveNote={archiveNote}
            pinNote={pinNote}
            deleteLabel={deleteLabel}
            addNewLabel={addNewLabel}
          />
        </div>
      </div>
    </div>
  );
};

export default NewNote;
