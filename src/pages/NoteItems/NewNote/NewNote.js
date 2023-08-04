import React, { useContext, useEffect, useState } from "react";
import "./newNote.css";
import { useOutsideClick } from "../Assets/useOutsideClick";
import ToolBar from "../ToolBar/ToolBar";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import { getCurrentDateTime } from "../Assets/getCurrentDateTime";
const NewNote = ({ setIsOpen, addNewNote }) => {
  const newNoteModalNode = useOutsideClick(() => setIsOpen(false));

  const newEmptyNote = {
    id: uuidv4(), // Generate a unique ID for each new note
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

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setNewNote((prev) => ({ ...prev, [name]: value }));
  //   console.log("changing new note");
  // };
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Check if the note is being created for the first time and set the "createdAt" field
    const updatedNote = {
      ...newNote,
      [name]: value,
      createdAt: newNote.createdAt || getCurrentDateTime(), // If "createdAt" doesn't exist, set it to the current timestamp
    };

    setNewNote(updatedNote);
    console.log("changing new note");
  };
  // useEffect(() => {
  //   // Save the new note when it is not empty
  //   addNewNote();
  //   setIsOpen(false);
  //   toast.success("New note is created!");
  // }, [newNote, setIsOpen]);

  const closeModal = () => {
    if (newNote.content.trim() === "" && newNote.title.trim() === "") {
      toast.error("Please add content or a title before saving the note!");
    } else {
      addNewNote(newNote);
      setIsOpen(false);
      toast.success("New note is created!");
    }
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
