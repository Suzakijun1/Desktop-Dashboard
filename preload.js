const { ipcRenderer, contextBridge } = require("electron");

contextBridge.exposeInMainWorld("electron", {
  shell: require("electron").shell,
  openFileDialog: () => {
    ipcRenderer.send("open-file-dialog");
  },
  // store: new (require("electron-store"))(),
  notificationApi: {
    sendNotification(message) {
      ipcRenderer.send("notify", message);
    },
  },
  openChrome() {
    ipcRenderer.send("openChrome");
  },
  openLeagueOfLegends() {
    ipcRenderer.invoke("openLeagueOfLegends");
  },
  openApp(route, args) {
    ipcRenderer.send("openApp", route, args);
  },
  batteryApi: {},
  filesApi: {},
  minimizeApp: () => {
    ipcRenderer.send("minimizeApp");
  },
  maximizeRestoreApp: () => {
    ipcRenderer.send("maximizeRestoreApp");
  },
  closeApp: () => {
    ipcRenderer.send("closeApp");
  },
  onMaximized: (callback) => {
    ipcRenderer.on("isMaximized", callback);
  },
  onRestored: (callback) => {
    ipcRenderer.on("isRestored", callback);
  },
});

// window.addEventListener("DOMContentLoaded", () => {
//   const replaceText = (selector, text) => {
//     const element = document.getElementById(selector);
//     if (element) element.innerText = text;
//   };

//   for (const type of ["chrome", "node", "electron"]) {
//     replaceText(`${type}-version`, process.versions[type]);
//   }
// });
