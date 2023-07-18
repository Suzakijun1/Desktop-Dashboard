import React, { useEffect, useState } from "react";
import { MdOutlineClose } from "react-icons/md";
import { AnimatePresence, motion } from "framer-motion";
import toast from "react-hot-toast";
import styles from "../styles/modules/modal.module.scss";
import Button from "../todolistComponents/Button";
import { v4 as uuidv4 } from "uuid";

const dropIn = {
  hidden: {
    opacity: 0,
    transform: "scale(0.9)",
  },
  visible: {
    transform: "scale(1)",
    opacity: 1,
    transition: {
      duration: 0.1,
      type: "spring",
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    transform: "scale(0.9)",
    opacity: 0,
  },
};

export default function UpdateMacroButton({
  modalOpen,
  setModalOpen,
  editedName,
  setEditedName,
  editedRoute,
  setEditedRoute,
  editedArgs, // Add editedArgs prop
  setEditedArgs, // Add setEditedArgs prop
  handleModalSave,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    handleModalSave();
  };

  const handleOpenFileDialog = async () => {
    try {
      const appRoute = await electron.openFileDialog();
      setEditedRoute(appRoute);
    } catch (err) {
      console.log(err);
    }
  };

  const handleNameChange = (e) => {
    setEditedName(e.target.value);
  };

  const handleRouteChange = (e) => {
    setEditedRoute(e.target.value);
  };

  const handleArgsChange = (e) => {
    setEditedArgs(e.target.value);
  };

  return (
    <AnimatePresence>
      {modalOpen && (
        <motion.div
          className={styles.wrapper}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className={styles.container}
            variants={dropIn}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <motion.div
              className={styles.closeButton}
              onKeyDown={() => setModalOpen(false)}
              onClick={() => setModalOpen(false)}
              role="button"
              tabIndex={0}
              initial={{ top: 40, opacity: 0 }}
              animate={{ top: -10, opacity: 1 }}
              exit={{ top: 40, opacity: 0 }}
            >
              <MdOutlineClose />
            </motion.div>
            <form className={styles.form} onSubmit={handleSubmit}>
              <h1 className={styles.formTitle}>Edit Macro</h1>
              <label htmlFor="name">
                Name
                <input
                  type="text"
                  id="name"
                  value={editedName}
                  onChange={handleNameChange}
                />
              </label>
              <label htmlFor="route">
                Route
                <input
                  type="text"
                  id="route"
                  value={editedRoute}
                  onChange={handleRouteChange}
                  disabled
                />
                <Button onClick={handleOpenFileDialog}>Browse</Button>
              </label>
              <label htmlFor="args">
                Arguments
                <input
                  type="text"
                  id="args"
                  value={editedArgs}
                  onChange={handleArgsChange}
                />
              </label>
              <div className={styles.buttonContainer}>
                <Button type="submit" onSubmit={handleSubmit} variant="primary">
                  Save Changes
                </Button>
                <Button variant="secondary" onClick={() => setModalOpen(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
