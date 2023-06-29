import React, { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import { MdOutlineClose } from "react-icons/md";
import { useDispatch } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
import toast from "react-hot-toast";
import { addMacro, updateMacro } from "./macroSlice";
import styles from "../styles/modules/modal.module.scss";
import Button from "../todolistComponents/Button";
import AddToMacroButton from "./AddToMacroButton";

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

function MacroModal({ type, modalOpen, setModalOpen, macro, updateMacro }) {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [route, setRoute] = useState("");

  useEffect(() => {
    if (type === "update" && macro) {
      setName(macro.name);
      setRoute(macro.route);
    } else {
      setName("");
      setRoute("");
    }
  }, [type, macro, modalOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name === "") {
      toast.error("Please enter a name for the macro");
      return;
    }
    if (route === "") {
      toast.error("Please enter a route for the macro");
      return;
    }
    if (name && route) {
      if (type === "add") {
        dispatch(
          addMacro({
            id: uuid(),
            name,
            route,
            time: new Date().toLocaleString(),
          })
        );
        updateMacro((prevMacro) => [...prevMacro, newMacro]);
        toast.success("Macro added successfully");
      }
      if (type === "update") {
        if (macro.name !== name || macro.route !== route) {
          dispatch(updateMacro({ ...macro, name, route }));
          toast.success("Macro updated successfully");
        } else {
          toast.error("No changes made");
          return;
        }
      }
      setModalOpen(false);
    }
  };

  const handleOpenFileDialog = async () => {
    try {
      const appRoute = await electron.openFileDialog();
      setRoute(appRoute);
    } catch (err) {
      console.log(err);
    }
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
            <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
              <h1 className={styles.formTitle}>
                {type === "add" ? "Add" : "Update"} Macro
              </h1>
              <label htmlFor="name">
                Name
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </label>
              <label htmlFor="route">
                Route
                <div className={styles.fileDialog}>
                  <input
                    type="text"
                    id="route"
                    value={route}
                    onChange={(e) => setRoute(e.target.value)}
                    disabled
                  />
                  <Button onClick={handleOpenFileDialog}>Browse</Button>
                </div>
              </label>
              <div className={styles.buttonContainer}>
                <Button type="submit" variant="primary">
                  {type === "add" ? "Add Macro" : "Update Macro"}
                </Button>
                <Button variant="secondary" onClick={() => setModalOpen(false)}>
                  Cancel
                </Button>
              </div>
            </form>
            {/* Remove the AddToMacroButton component */}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default MacroModal;
