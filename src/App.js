import React from "react";
import { useState } from "react";
import DragAndDrop from "./components/DragAndDrop";

// const Store = require("electron-store");

// const path = require("path");
// const fs = require("fs");

// const store = new Store();

export default function App({ electron }) {
  const [macro, updateMacro] = useState([
    {
      id: '1',
      name: 'Chrome',
      route : "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"
    },
    {
      id: '2',
      name: 'Mozilla Firefox',
      route: "C:\\Program Files\\Mozilla Firefox\\firefox.exe"
    },
  ])

  const openExplorer = () => {
    // const { shell } = window.require("electron");
    electron.shell.openPath("C:/");
  };

  const registerFunctions = () => {
    const functions = {
      openChrome,
      openExplorer,
    };

    electron.store.set("functions", functions);
  };

  return (
    <div className="container">
      <h1>Welcome to my Macro Dashboard!</h1>

      <button onClick={registerFunctions}>Register Functions</button>
      <button
        onClick={() => {
          electron.openChrome();
        }}
      >
        Open Chrome
      </button>
      <button onClick={openExplorer}>Open File Explorer</button>
      <button
        onClick={() => {
          electron.notificationApi.sendNotification(
            "My custom notification!!"
          );
        }}
      >
        Notify
      </button>
      <button
        onClick={() => {
          electron.openLeagueOfLegends();
        }}
      >
        Open League of Legends
      </button>
      <button
        onClick={() => {
          macro.forEach((app) => {
            electron.openApp(app.route);
          });
        }}
      >
        Open Apps in Macro
      </button>
      <DragAndDrop
        macro={macro}
        updateMacro={updateMacro}
      />
    </div>
  );
}
