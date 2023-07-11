const { ipcRenderer, contextBridge } = require("electron");

// Expose select APIs and functionalities to the renderer process
contextBridge.exposeInMainWorld("electronAPI", {
  // Define the function to send an IPC message to the main process
  sendIPCMessage: (channel, data) => {
    ipcRenderer.send(channel, data);
  },

  // Listen for an IPC message from the main process
  receiveIPCMessage: (channel, listener) => {
    ipcRenderer.on(channel, (event, ...args) => listener(...args));
  },
});

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
  writeFile(path, data) {
    ipcRenderer.send("writeFile", path, data);
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

  fetchEmails: async () => {
    try {
      const emails = await ipcRenderer.invoke("fetchEmails");
      return emails;
    } catch (error) {
      console.error("Error fetching emails:", error);
      throw error;
    }
  },

  authenticate: async () => {
    try {
      const auth = await ipcRenderer.invoke("authenticate");
      return auth;
    } catch (error) {
      console.error('Error invoking remote method "authenticate":', error);
      throw error;
    }
  },
  // Define the function to send an IPC message to the main process
  sendIPCMessage: (channel, data) => {
    ipcRenderer.send(channel, data);
  },

  // Listen for an IPC message from the main process
  receiveIPCMessage: (channel, listener) => {
    ipcRenderer.on(channel, (event, ...args) => listener(...args));
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
