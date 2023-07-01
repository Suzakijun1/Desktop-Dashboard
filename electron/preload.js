const { ipcRenderer, contextBridge } = require("electron");
// const Store = require("electron-store");
// const store = new Store();

contextBridge.exposeInMainWorld("electron", {
  shell: require("electron").shell,
  openFileDialog: async () => {
    const result = await ipcRenderer.invoke("open-file-dialog");
    // store.set("result", result); //Save the result using electron-store
    return result;
  },
  openSaveFileDialog: async () => {
    const result = await ipcRenderer.invoke("save-file-dialog");
    return result;
  },
  // store: new (require("electron-store"))(),
  notificationApi: {
    sendNotification(message) {
      ipcRenderer.send("notify", message);
    },
  },
  toDoNotification: (notificationTime) => {
    ipcRenderer.send("scheduler", notificationTime);
    console.log("notification scheduled");
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
