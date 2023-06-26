const {
  app,
  BrowserWindow,
  ipcMain,
  Notification,
  shell,
  dialog,
} = require("electron");
const path = require("path");
const fs = require("fs");
const isDev = !app.isPackaged;
const {
  getWindowSettings,
  saveBounds,
  getWindowPosition,
  savePosition,
} = require("./setting");
const Store = require("electron-store");
const storage = new Store();

function createWindow() {
  const bounds = getWindowSettings();
  console.log(bounds);
  const xyposition = getWindowPosition();

  const win = new BrowserWindow({
    width: bounds[0],
    height: bounds[1],
    x: xyposition[0],
    y: xyposition[1],
    //uncomment frame in order to remove the default frame
    // frame: false,
    webPreferences: {
      //disables the ability to access Node.js modules directly from the renderer process. This is a security measure that prevents potential vulnerabilities that could arise from unrestricted access to Node.js functionality in the renderer process
      nodeIntegration: false,
      //ensure that the javascript code executed in the renderer process is run in a secure and isolated environment
      worldSafeExecuteJavaScript: true,
      //each renderer process operates within its own separate JavaScript context, preventing scripts injected into web content from accessing Electron-specific APIs directly and adds and extra layer of security
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });
  win.on("resize", () => saveBounds(win.getSize()));
  win.on("moved", () => savePosition(win.getPosition()));

  win.loadFile(path.join(__dirname, "..", "index.html"));

  //// CLOSE APP
  ipcMain.on("minimizeApp", () => {
    console.log("Clicked on Minimize Btn");
    win.minimize();
  });

  //// MAXIMIZE RESTORE APP
  ipcMain.on("maximizeRestoreApp", () => {
    if (win.isMaximized()) {
      console.log("Clicked on Restore");
      win.restore();
    } else {
      console.log("Clicked on Maximize");
      win.maximize();
    }
  });
  // Check if is Maximized
  win.on("maximize", () => {
    win.webContents.send("isMaximized");
  });
  // Check if is Restored
  win.on("unmaximize", () => {
    win.webContents.send("isRestored");
  });

  //// CLOSE APP
  ipcMain.on("closeApp", () => {
    console.log("Clicked on Close Btn");
    win.close();
  });
}

//if the application is running in development mode('isDev' is 'true'), this code sets up 'electron-reload'. (auto reload of electron app when changes are made)
if (isDev) {
  require("electron-reload")(path.join(__dirname, ".."), {
    electron: path.join(__dirname, "..", "node_modules", ".bin", "electron"),
  });
}
//this code listens for an IPC(Inter-Process Communication) event called 'notify' and creates a new notification with the message that was passed in.
ipcMain.on("notify", (_, message) => {
  new Notification({ title: "Notification", body: message }).show();
});

ipcMain.on("openApp", (_, route, args) => {
  const { spawn } = require("child_process");
  const child = spawn(route, args, { detached: true });

  child.on("error", (error) => {
    console.error(`Error executing League of Legends: ${error.message}`);
  });
});

//this code starts up the Electron application.
app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});
//this code quits the application when all windows are closed, except on macOS. There, it's common for applications and their menu bar to stay active until the user quits explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// shell.showItemInFolder(
//   "C:\\Users\\james\\Desktop\\MacroDashboard\\src\\main.js"
// );

ipcMain.handle("open-file-dialog", async (event) => {
  const window = BrowserWindow.fromWebContents(event.sender);
  const route = await getFileFromUser(window);

  console.log(`${route} is of type ${typeof route}`);

  return route;
});

const getFileFromUser = async (window) => {
  const files = await dialog.showOpenDialogSync(window, {
    properties: ["openFile"],
    filters: [
      {
        name: "Text Files",
        extensions: ["txt"],
      },
    ],
  });

  if (!files) return;
  const result = files[0];
  storage.set("result", result);
  return files[0];
};

ipcMain.handle("save-file-dialog", async (event) => {
  const items = storage.get("result"); // Retrieve the items from electron-store
  if (typeof items === "string") {
    shell
      .openPath(items)
      .then(() => {
        console.log(`Successfully opened: ${items}`);
      })
      .catch((error) => {
        console.error(`Error opening: ${items}`, error);
      });
  }

  return items; // Return the item
});

// const openAllItems = () => {
//   const result = storage.get("result");
//   console.log(result);
// if (result && Array.isArray(result)) {
//   result.forEach((item) => {
//     shell
//       .openPath(item)
//       .then(() => {
//         console.log(`Successfully opened: ${item}`);
//       })
//       .catch((error) => {
//         console.error(`Error opening: ${item}`, error);
//       });
//   });
// }
// };
