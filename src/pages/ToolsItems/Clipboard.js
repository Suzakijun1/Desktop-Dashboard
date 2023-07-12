import React, { useState, useEffect } from "react";

const Clipboard = () => {
  const [clipboards, setClipboards] = useState([]);

  useEffect(() => {
    // Load saved clipboards from localStorage on component mount
    const savedClipboards = localStorage.getItem("clipboards");
    if (savedClipboards) {
      setClipboards(JSON.parse(savedClipboards));
    }
  }, []);

  useEffect(() => {
    // Save clipboards to localStorage whenever they change
    localStorage.setItem("clipboards", JSON.stringify(clipboards));
  }, [clipboards]);

  const handleAddClipboard = () => {
    setClipboards([...clipboards, ""]);
  };

  const handleInputChange = (event, index) => {
    const updatedClipboards = [...clipboards];
    updatedClipboards[index] = event.target.value;
    setClipboards(updatedClipboards);
  };

  const handleCopyToClipboard = (clipboard) => {
    navigator.clipboard
      .writeText(clipboard)
      .then(() => {
        console.log("Text copied to clipboard");
      })
      .catch((error) => {
        console.error("Failed to copy text to clipboard:", error);
      });
  };

  return (
    <div
      className="clipboard-container"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
      }}
    >
      <h1>Clipboard</h1>
      <div
        className="clipboards-wrapper"
        style={{ display: "flex", flexDirection: "column", gap: "10px" }}
      >
        {clipboards.map((clipboard, index) => (
          <div
            className="clipboard-item"
            style={{ display: "flex", gap: "10px", borderRadius: "5px" }}
            key={index}
          >
            <input
              type="text"
              value={clipboard}
              onChange={(event) => handleInputChange(event, index)}
            />
            <button onClick={() => handleCopyToClipboard(clipboard)}>
              Copy to Clipboard
            </button>
          </div>
        ))}
      </div>
      <button
        className="add-button"
        style={{ alignSelf: "flex-end" }}
        onClick={handleAddClipboard}
      >
        Add Clipboard
      </button>
    </div>
  );
};

export default Clipboard;
