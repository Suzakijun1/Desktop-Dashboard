const { ipcRenderer, contextBridge } = require("electron");

contextBridge.exposeInMainWorld("electron", {
  shell: require("electron").shell,
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
  openApp(route){
    ipcRenderer.send("openApp" , route);
  },
  batteryApi: {},
  filesApi: {},
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
