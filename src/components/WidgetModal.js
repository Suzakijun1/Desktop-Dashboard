import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdOutlineClose } from "react-icons/md";
import { AnimatePresence, motion } from "framer-motion";
import toast from "react-hot-toast";
import { addWidget } from "./slices/widgetSlice";
import styles from "../styles/modules/modal.module.scss";
import Button from "../todolistComponents/Button";
import Weather from "./Weather";
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

function WidgetModal({ modalOpen, setModalOpen, addWidget }) {
  const dispatch = useDispatch();

  const [selectedWidgets, setSelectedWidgets] = useState([]);

  // Get the list of current widgets from the Redux store
  const availableWidgets = useSelector((state) => {
    console.log(state.widgets.widgets);
    return state.widgets.widgets;
  });
  const selectedWidget = useSelector((state) => state.widgets.selectedWidget);

  useEffect(() => {
    setSelectedWidgets([]);
  }, [modalOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (selectedWidgets.length === 0) {
      toast.error("Please select at least one widget");
      return;
    }
    const selectedWidgetNames = selectedWidgets.map((widgetId) => {
      const widget = availableWidgets.find((widget) => widget.id === widgetId);
      return widget;
    });
    // const newWidget = {
    //   name: selectedWidgetNames.join(", "), // Concatenate the selected widget names
    //   selectedWidgets,
    // };

    dispatch(addWidget(selectedWidgetNames));
    // dispatch(selectedWidget(newWidget.id)); // Select the added widget
    toast.success("Widget added successfully");

    // setSelectedWidgets([]);
    setModalOpen(false);
  };

  //   const handleWidgetSelection = (widgetId) => {
  //     setSelectedWidgets((prevSelectedWidgets) => {
  //       if (prevSelectedWidgets.includes(widgetId)) {
  //         return prevSelectedWidgets.filter((id) => id !== widgetId);
  //       } else {
  //         return [...prevSelectedWidgets, widgetId];
  //       }
  //     });
  //   };

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
              <h1 className={styles.formTitle}>Add Widget</h1>

              <div>
                <h2>Available Widgets</h2>
                {availableWidgets.map((widget) => (
                  <div key={widget.id}>
                    <label>
                      <input
                        type="checkbox"
                        // checked={selectedWidgets.includes(widget.id)}
                        // onChange={() => handleWidgetSelection(widget.id)}
                      />
                      {widget.name}
                    </label>
                  </div>
                ))}
                {/* {selectedWidgets.includes(2) && <Weather />} */}
              </div>
              <div className={styles.buttonContainer}>
                <Button
                  type="submit"
                  variant="primary"
                  onClick={() => {
                    dispatch(addWidget(widget));
                    console.log("widget added" + widget);
                  }}
                >
                  Add Widget
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

export default WidgetModal;
