import React from "react";
import { useState } from "react";
import DragAndDrop from "../components/DragAndDrop";
import FileOpenButton from "../components/FileOpenButton";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

// const Store = require("electron-store");

// const path = require("path");
// const fs = require("fs");

// const store = new Store();

export default function Home({ electron }) {
  const [macro, updateMacro] = useState([
    {
      id: "1",
      name: "Chrome",
      route: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
      arguments: ["https://www.google.com"],
    },
    {
      id: "2",
      name: "Mozilla Firefox",
      route: "C:\\Program Files\\Mozilla Firefox\\firefox.exe",
      arguments: ["https://www.google.com"],
    },
    {
      id: "3",
      name: "Notepad",
      route: "C:\\Windows\\notepad.exe",
      arguments: [],
    },
  ]);

  return (
    <div className="container">
      <h1>Welcome to my Macro Dashboard!</h1>
      <button
        onClick={() => {
          electron.notificationApi.sendNotification("My custom notification!!");
        }}
      >
        Notify
      </button>
      <FileOpenButton />
      <button
        onClick={() => {
          macro.forEach((app) => {
            electron.openApp(app.route, app.arguments);
          });
        }}
      >
        Open Apps in Macro
      </button>
      <DragAndDrop macro={macro} updateMacro={updateMacro} />
    </div>
  );
}
