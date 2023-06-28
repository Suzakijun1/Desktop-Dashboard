import React, { useState, useEffect } from "react";
import {
  HashRouter,
  Switch,
  Route,
  Link,
  Routes,
  Router,
} from "react-router-dom";
import Home from "./pages/Home";
import Playtest from "./pages/Playtest.js";
import ToDoList from "./pages/ToDoList.js";
import "./styles/styles.css";

// import Home from "./pages/Home";

export default function App({ electron }) {
  return (
    <HashRouter>
      <Routes>
        <Route exact path="/" element={<Home electron={electron} />} />
        <Route path="/playtest" element={<Playtest />} />
        <Route path="/todolist" element={<ToDoList />} />
      </Routes>
    </HashRouter>
  );
}
