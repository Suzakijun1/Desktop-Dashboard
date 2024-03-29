import React from "react";
import "./sidebar.css";
import { NavLink } from "react-router-dom";
// import { AuthContext } from "../../contexts/AuthContext";
// Remove the import for useNotesData hook as well if it's related to Firebase.

const Sidebar = () => {
  const getActiveStyle = ({ isActive }) => ({
    color: isActive && "var(--white-color)",
    backgroundColor: isActive && "var(--primary-color)",
  });

  const getAllLabels = () => {
    // Assuming labeledNotes is an array of objects with a 'label' property
    const labeledNotes = [
      { label: "Work" },
      { label: "Personal" },
      { label: "Important" },
      // Add more sample data if needed
    ];

    const labels = labeledNotes.map((n) => n.label);
    const mergedLabels = [].concat(...labels);
    const allLabels = [...new Set(mergedLabels)].sort((a, b) =>
      a.localeCompare(b)
    );
    return allLabels;
  };

  return (
    <div>
      <div className="sidebar">
        <NavLink to="/notes" className="sidebar-items" style={getActiveStyle}>
          <i className="fa-solid fa-note-sticky"></i> <span>Notes</span>
        </NavLink>
        <NavLink to="/archive" className="sidebar-items" style={getActiveStyle}>
          <i className="fa-solid fa-box-archive"></i> <span>Archive</span>
        </NavLink>
        <NavLink to="/bin" className="sidebar-items" style={getActiveStyle}>
          <i className="fa-solid fa-trash-can"></i> <span>Bin</span>
        </NavLink>
        {getAllLabels().map((label) => (
          <NavLink
            to={`/${label.replace(/\s/g, "-")}`}
            className="sidebar-items label-sidebar"
            style={getActiveStyle}
          >
            <i className="fa-solid fa-tag"></i> <span>{label}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
