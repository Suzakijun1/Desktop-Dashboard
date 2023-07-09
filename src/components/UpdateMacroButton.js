// import React, { useEffect, useState } from "react";
// import { MdOutlineClose } from "react-icons/md";
// import { AnimatePresence, motion } from "framer-motion";
// import toast from "react-hot-toast";
// import styles from "../styles/modules/modal.module.scss";
// import Button from "../todolistComponents/Button";

// const dropIn = {
//   hidden: {
//     opacity: 0,
//     transform: "scale(0.9)",
//   },
//   visible: {
//     transform: "scale(1)",
//     opacity: 1,
//     transition: {
//       duration: 0.1,
//       type: "spring",
//       damping: 25,
//       stiffness: 500,
//     },
//   },
//   exit: {
//     transform: "scale(0.9)",
//     opacity: 0,
//   },
// };

// export default function AddToMacroButton({
//   modalOpen,
//   setModalOpen,
//   workflow,
//   setWorkflow,
// }) {
//   const [name, setName] = useState("");
//   const [route, setRoute] = useState("");
//   const [args, setArgs] = useState("");
//   const [editingMacroIndex, setEditingMacroIndex] = useState(null);

//   useEffect(() => {
//     console.log(name);
//     console.log(route);
//   }, [name, route]);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("submitting");
//     if (name === "") {
//       toast.error("Please enter a name for the macro");
//       return;
//     }
//     if (route === "") {
//       toast.error("Please enter a route for the macro");
//       return;
//     }
//     if (editingMacroIndex !== null) {
//       // Update existing macro
//       setWorkflow((oldWorkflow) => {
//         const updatedMacro = [...oldWorkflow.macro];
//         updatedMacro[editingMacroIndex] = {
//           ...updatedMacro[editingMacroIndex],
//           name: name,
//           route: route,
//           arguments: args ? args.split(" ") : [],
//         };
//         return {
//           ...oldWorkflow,
//           macro: updatedMacro,
//         };
//       });
//       toast.success("Macro updated successfully");
//     } else {
//       // Add new macro
//       setWorkflow((oldWorkflow) => {
//         return {
//           ...oldWorkflow,
//           macro: [
//             ...oldWorkflow.macro,
//             {
//               id: String(oldWorkflow.macro.length + 1),
//               name: name,
//               route: route,
//               arguments: args ? args.split(" ") : [],
//             },
//           ],
//         };
//       });
//       toast.success("Macro added successfully");
//     }
//     setModalOpen(false);
//     resetForm();
//   };

//   const handleOpenFileDialog = async () => {
//     try {
//       const appRoute = await electron.openFileDialog();
//       setRoute(appRoute);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const resetForm = () => {
//     setName("");
//     setRoute("");
//     setArgs("");
//     setEditingMacroIndex(null);
//   };

//   const handleEditMacro = (index) => {
//     const { name, route, arguments: macroArgs } = workflow.macro[index];
//     setName(name);
//     setRoute(route);
//     setArgs(macroArgs.join(" "));
//     setEditingMacroIndex(index);
//     setModalOpen(true);
//   };

//   return (
//     <AnimatePresence>
//       {modalOpen && (
//         <motion.div
//           className={styles.wrapper}
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//         >
//           <motion.div
//             className={styles.container}
//             variants={dropIn}
//             initial="hidden"
//             animate="visible"
//             exit="exit"
//           >
//             <motion.div
//               className={styles.closeButton}
//               onKeyDown={() => setModalOpen(false)}
//               onClick={() => {
//                 resetForm();
//                 setModalOpen(false);
//               }}
//               role="button"
//               tabIndex={0}
//               initial={{ top: 40, opacity: 0 }}
//               animate={{ top: -10, opacity: 1 }}
//               exit={{ top: 40, opacity: 0 }}
//             >
//               <MdOutlineClose />
//             </motion.div>
//             <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
//               <h1 className={styles.formTitle}>
//                 {editingMacroIndex !== null ? "Update Macro" : "Add Macro"}
//               </h1>
//               <label htmlFor="name">
//                 Name
//                 <input
//                   type="text"
//                   id="name"
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                 />
//               </label>
//               <label htmlFor="route">
//                 Route
//                 <input
//                   type="text"
//                   id="route"
//                   value={route}
//                   onChange={(e) => setRoute(e.target.value)}
//                   disabled
//                 />
//                 <Button onClick={handleOpenFileDialog}>Browse</Button>
//               </label>
//               <label htmlFor="args">
//                 Arguments
//                 <input
//                   type="text"
//                   id="args"
//                   value={args}
//                   onChange={(e) => setArgs(e.target.value)}
//                 />
//               </label>
//               <div className={styles.buttonContainer}>
//                 <Button type="submit" onSubmit={handleSubmit} variant="primary">
//                   {editingMacroIndex !== null ? "Update Macro" : "Add Macro"}
//                 </Button>
//                 <Button
//                   variant="secondary"
//                   onClick={() => {
//                     resetForm();
//                     setModalOpen(false);
//                   }}
//                 >
//                   Cancel
//                 </Button>
//               </div>
//             </form>
//           </motion.div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// }
import React from "react";
import { MdOutlineClose } from "react-icons/md";
import { motion } from "framer-motion";
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

export default function UpdateMacroButton({
  modalOpen,
  setModalOpen,
  editedName,
  setEditedName,
  editedRoute,
  setEditedRoute,
  handleModalSave,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    handleModalSave();
  };

  return (
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
              onChange={(e) => setEditedName(e.target.value)}
            />
          </label>
          <label htmlFor="route">
            Route
            <input
              type="text"
              id="route"
              value={editedRoute}
              onChange={(e) => setEditedRoute(e.target.value)}
              disabled
            />
          </label>
          <div className={styles.buttonContainer}>
            <Button type="submit" variant="primary">
              Save Changes
            </Button>
            <Button variant="secondary" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}
