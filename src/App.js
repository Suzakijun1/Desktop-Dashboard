import React from "react";
import DragAndDrop from "./components/DragAndDrop";

// const Store = require("electron-store");

// const path = require("path");
// const fs = require("fs");

// const store = new Store();

export default function App({ electron }) {

  const appsToOpen = ["C:\\Program Files\\Mozilla Firefox\\firefox.exe", "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"]

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
            appsToOpen.forEach((app) => {
              electron.openApp(app);
            });
          }}
        >
          Open FireFox
        </button>
        <DragAndDrop/>
      </div>
  );
}
