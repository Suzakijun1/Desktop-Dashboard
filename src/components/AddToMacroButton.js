// import React from "react";
// import { prompt } from "smalltalk";
import React, { useEffect, useState } from "react";
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

export default function AddToMacroButton({ modalOpen, setModalOpen, workflow, setWorkflow }) {
    
    const [name, setName] = useState("");
    const [route, setRoute] = useState("");
    const [args, setArgs] = useState("");


    useEffect(() => {
        console.log(name)
        console.log(route)
    }, [name, route])

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("submitting")
        if (name === "") {
            toast.error("Please enter a name for the macro");
            return;
        }
        if (route === "") {
            toast.error("Please enter a route for the macro");
            return;
        }
        if (name && route) {
            setWorkflow((oldWorkflow) =>  {
                return {   
                    ...oldWorkflow,
                    macro : [...oldWorkflow.macro, {
                    id: String(oldWorkflow.macro.length + 1),
                    name: name,
                    route: route,
                    arguments: args ? args.split(" ") : []
                    }]
                }
            })
        }
        setModalOpen(false);
    }


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
                                Add Macro
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
                                <input
                                    type="text"
                                    id="route"
                                    value={route}
                                    onChange={(e) => setRoute(e.target.value)}
                                    disabled
                                />
                                <Button onClick={handleOpenFileDialog}>Browse</Button>
                            </label>
                            <label htmlFor="args">
                                Arguments
                                <input
                                    type="text"
                                    id="args"
                                    value={args}
                                    onChange={(e) => setArgs(e.target.value)}
                                />
                            </label>
                            <div className={styles.buttonContainer}>
                                <Button type="submit" onSubmit={handleSubmit} variant="primary">
                                    Add Macro
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

    )
}