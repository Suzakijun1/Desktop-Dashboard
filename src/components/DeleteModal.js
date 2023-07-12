import React, { useState } from "react";
import { MdOutlineClose } from "react-icons/md";
import { AnimatePresence, motion } from "framer-motion";
import toast from "react-hot-toast";
import styles from "../styles/modules/modal.module.scss";
import Button from "../todolistComponents/Button";

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

export default function AddToMacroButton({
  modalOpen,
  setModalOpen,
  workflow,
  setWorkflow,
  deleteModalOpen,
  setDeleteModalOpen,
  handleConfirmDelete,
}) {
  const handleDeleteWorkflow = () => {
    setDeleteModalOpen(true);
  };

  const handleCancelDelete = () => {
    setDeleteModalOpen(false);
  };

  const handleSubmit = (name) => {
    // Add to macro logic here
    setModalOpen(false);
  };

  return (
    <div>
      <AnimatePresence>
        {deleteModalOpen && (
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
                onKeyDown={() => {
                  setModalOpen(false);
                  setDeleteModalOpen(false);
                }}
                onClick={() => {
                  setModalOpen(false);
                  setDeleteModalOpen(false);
                }}
                role="button"
                tabIndex={0}
                initial={{ top: 40, opacity: 0 }}
                animate={{ top: -10, opacity: 1 }}
                exit={{ top: 40, opacity: 0 }}
              >
                <MdOutlineClose />
              </motion.div>
              {modalOpen && (
                <form
                  className={styles.form}
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit();
                  }}
                >
                  {/* Add to macro form content */}
                </form>
              )}
              {deleteModalOpen && (
                <div className={styles.content}>
                  <h1 className={styles.title}>Confirm Deletion</h1>
                  <p className={styles.message}>
                    Are you sure you want to delete the workflow?
                  </p>
                  <div className={styles.buttonContainer}>
                    <Button variant="danger" onClick={handleConfirmDelete}>
                      Delete
                    </Button>
                    <Button variant="secondary" onClick={handleCancelDelete}>
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
