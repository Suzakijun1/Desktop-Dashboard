// import React, { useState, useEffect } from "react";

// const Clipboard = () => {
//   const [clipboards, setClipboards] = useState([]);

//   useEffect(() => {
//     // Load saved clipboards from localStorage on component mount
//     const savedClipboards = localStorage.getItem("clipboards");
//     if (savedClipboards) {
//       setClipboards(JSON.parse(savedClipboards));
//     }
//   }, []);

//   useEffect(() => {
//     // Save clipboards to localStorage whenever they change
//     localStorage.setItem("clipboards", JSON.stringify(clipboards));
//   }, [clipboards]);

//   const handleAddClipboard = () => {
//     setClipboards([...clipboards, ""]);
//   };

//   const handleInputChange = (event, index) => {
//     const updatedClipboards = [...clipboards];
//     updatedClipboards[index] = event.target.value;
//     setClipboards(updatedClipboards);
//   };

//   const handleCopyToClipboard = (clipboard) => {
//     navigator.clipboard
//       .writeText(clipboard)
//       .then(() => {
//         console.log("Text copied to clipboard");
//       })
//       .catch((error) => {
//         console.error("Failed to copy text to clipboard:", error);
//       });
//   };

//   return (
//     <div
//       className="clipboard-container"
//       style={{
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "flex-start",
//       }}
//     >
//       <h1>Clipboard</h1>
//       <div
//         className="clipboards-wrapper"
//         style={{ display: "flex", flexDirection: "column", gap: "10px" }}
//       >
//         {clipboards.map((clipboard, index) => (
//           <div
//             className="clipboard-item"
//             style={{ display: "flex", gap: "10px", borderRadius: "5px" }}
//             key={index}
//           >
//             <input
//               type="text"
//               value={clipboard}
//               onChange={(event) => handleInputChange(event, index)}
//             />
//             <button onClick={() => handleCopyToClipboard(clipboard)}>
//               Copy to Clipboard
//             </button>
//           </div>
//         ))}
//       </div>
//       <button
//         className="add-button"
//         style={{ alignSelf: "flex-end" }}
//         onClick={handleAddClipboard}
//       >
//         Add Clipboard
//       </button>
//     </div>
//   );
// };

// export default Clipboard;
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MdDelete, MdEdit, MdGetApp } from "react-icons/md";
import styles from "../../styles/modules/todoItem.module.scss";
import styles1 from "../../styles/modules/app.module.scss";

const Clipboard = ({ workflow, setWorkflow }) => {
  const [clipboards, setClipboards] = useState([]);
  const [editableIndex, setEditableIndex] = useState(null);
  const [copied, setCopied] = useState(false);

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
        setCopied(true);
        console.log("Text copied to clipboard");
      })
      .catch((error) => {
        console.error("Failed to copy text to clipboard:", error);
      });
  };

  const handleEdit = (index) => {
    setEditableIndex(index);
  };

  const handleSave = () => {
    setEditableIndex(null);
  };

  const handleDelete = (index) => {
    const updatedClipboards = [...clipboards];
    updatedClipboards.splice(index, 1);
    setClipboards(updatedClipboards);
  };

  return (
    <div className={styles1.app__wrapper}>
      <h1>Clipboard</h1>
      <div className={styles.content__wrapper}>
        <div className={styles.texts}>
          {clipboards.map((clipboard, index) => (
            <div className={styles.item} key={index}>
              {editableIndex === index ? (
                <input
                  type="text"
                  value={clipboard}
                  onChange={(event) => handleInputChange(event, index)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      handleSave();
                    }
                  }}
                  onBlur={handleSave}
                  autoFocus
                />
              ) : (
                <div
                  className={styles.itemText}
                  onClick={() => handleEdit(index)}
                >
                  {index + 1}. {clipboard || "Click to edit"}
                </div>
              )}
              <div className={styles.todoActions}>
                {editableIndex !== index && (
                  <div
                    className={`${styles.icon} ${
                      copied && editableIndex === null ? styles.copied : ""
                    }`}
                    onClick={() => handleCopyToClipboard(clipboard)}
                  >
                    <MdGetApp />
                  </div>
                )}
                {editableIndex !== index && (
                  <div
                    className={styles.icon}
                    onClick={() => handleDelete(index)}
                  >
                    <MdDelete />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        <motion.button
          className={`${styles.addButton} ${styles.icon}`}
          onClick={handleAddClipboard}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          +
        </motion.button>
      </div>
    </div>
  );
};

export default Clipboard;
