import React, { useState, useEffect } from "react";
import DragAndDrop from "../components/DragAndDrop";
import FileOpenButton from "../components/FileOpenButton";
import RunMacroButton from "../components/RunMacroButton";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import AddToMacroButton from "../components/AddToMacroButton";
import Navbar from "../components/Navbar";
import Button from "../todolistComponents/Button";
// const Store = require("electron-store");

// const path = require("path");
// const fs = require("fs");

// const store = new Store();

export default function Home({ electron, macro, updateMacro }) {
  const [modalOpen, setModalOpen] = useState(false);


  return (

      <div className="container">
        <h1>Welcome to my Macro Dashboard!</h1>
        <Button variant="primary" id="macro" onClick={() => setModalOpen(true)}>
          Add to Macro
        </Button>
        <AddToMacroButton modalOpen={modalOpen} setModalOpen={setModalOpen} macro={macro} updateMacro={updateMacro} />
        <DragAndDrop macro={macro} updateMacro={updateMacro} />
      </div>
  );
}
