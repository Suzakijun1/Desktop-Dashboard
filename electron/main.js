const {
  app,
  BrowserWindow,
  ipcMain,
  Notification,
  shell,
  dialog,
  contextBridge,
} = require("electron");
const path = require("path");
const fs = require("fs");
const prompt = require("electron-prompt");
const isDev = !app.isPackaged;
const {
  getWindowSettings,
  saveBounds,
  getWindowPosition,
  savePosition,
} = require("./setting");
const Store = require("electron-store");
const storage = new Store();
const { google } = require("googleapis");
const schedule = require("node-schedule");

//TO-DO-LIST NOTIFICATION CODE
ipcMain.on("scheduler", (event, data) => {
  const { notificationTime, title } = data;
  console.log(data);
  if (!notificationTime) {
    // Empty notificationTime, do not schedule the notification
    return;
  }

  const currentDate = new Date();
  console.log("the current date is " + currentDate);

  const scheduledTime = new Date(notificationTime);
  console.log("the selected schedule time is " + scheduledTime);
  const timeDiff = scheduledTime.getTime() - currentDate.getTime();
  console.log("the notification will play in " + timeDiff + " milliseconds");
  if (timeDiff <= 0) {
    // The notification time has already passed, do not schedule the notification
    return;
  }

  setTimeout(() => {
    const notification = new Notification({
      title: "To-Do-List notification!!",
      body: title,
    });

    notification.show();
  }, timeDiff);

  event.sender.send("scheduler", notificationTime);
});

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
      contentSecurityPolicy:
        "default-src 'self'; script-src 'self' 'unsafe-inline';",
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
  // require("electron-reload")(path.join(__dirname, ".."), {
  //   electron: path.join(__dirname, "..", "node_modules", ".bin", "electron"),
  require("electron-reload")(__dirname, {
    ignored: /\.\.src\/config|[\/\\]\./,
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
    console.error(`Error executing App: ${error.message}`);
  });
});

ipcMain.on("writeFile", (_, path, data) => {
  fs.writeFileSync(path, data, (err) => {
    if (err) throw err;
    console.log("The file has been saved!");
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
        name: "Executable",
        extensions: ["exe"],
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

async function authenticate() {
  // Load credentials from a file or environment variables
  const credentialsPath = path.join(__dirname, "credentials.json");
  const credentials = JSON.parse(fs.readFileSync(credentialsPath, "utf8"));
  console.log("CREDENTIALS: ", credentials);
  // Create OAuth2 client
  const { client_secret, client_id, redirect_uris } = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0]
  );

  // Check if credentials are already stored
  let token = storage.get("token");
  if (!token) {
    // Authorize the client
    const authUrl = oAuth2Client.generateAuthUrl({
      access_type: "offline",
      scope: ["https://www.googleapis.com/auth/gmail.readonly"],
    });
    await getCodeFromUser(authUrl);
    token = storage.get("token");
  }

  // Set token to the client
  oAuth2Client.setCredentials({ access_token: token });

  return oAuth2Client;
}

async function getCodeFromUser(authUrl) {
  // Display the authorization URL to the user
  const authWindow = new BrowserWindow({
    width: 800,
    height: 600,
    show: false,
    webPreferences: {
      nodeIntegration: false,
    },
  });
  authWindow.loadURL(authUrl);
  authWindow.show();

  // Wait for the user to authorize the application
  return new Promise((resolve, reject) => {
    authWindow.webContents.on("will-redirect", async (event, url) => {
      console.log("Redirect URL:", url);
      const match = url.match(/code([^&]+)/);
      if (match && match[1]) {
        await exchangeCodeForTokens();
        authWindow.destroy();
        resolve(code);
      } else {
        reject(new Error("Authorization code not found in the redirect URL."));
      }
    });

    authWindow.on("close", () => {
      reject(new Error("Authorization window was closed by the user."));
    });
  });
}

async function exchangeCodeForTokens() {
  const authorizationCode = await prompt({
    title: "Authorization code",
    label: "Enter the authorization code",
    value: "",
    type: "input",
  });
  const credentials = require("./credentials.json"); // Path to your credentials file
  const { client_secret, client_id, redirect_uris } = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0]
  );

  const { tokens } = await oAuth2Client.getToken(authorizationCode);

  // You can now use the access token and refresh token for authorized API requests
  storage.set("token", tokens.access_token);
}

// Call the function with the authorization code

async function fetchEmailData(message) {
  try {
    const auth = await authenticate();
    const gmail = await google.gmail({ version: "v1", auth });

    const response = await gmail.users.messages.get({
      userId: "me",
      id: message.id,
      format: "full",
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching email:", error);
    return null;
  }
}

// Register an IPC handler in the main process to receive email data from the renderer process
ipcMain.on("request-emails", async (event) => {
  try {
    const auth = await authenticate();
    const gmail = await google.gmail({ version: "v1", auth });

    const response = await gmail.users.messages.list({
      userId: "me",
      labelIds: ["INBOX"],
      maxResults: 20,
    });

    const messages = response.data.messages || [];
    const emails = await Promise.all(messages.map(fetchEmailData));

    // Send the emails back to the renderer process
    event.sender.send("emails", emails);
  } catch (error) {
    console.error("Error fetching emails:", error);
    if (error.code === 401) {
      storage.delete("token");
      event.sender.send("login");
    }
  }
});

// let appUsageData = {};
// function trackAppUsage() {
//   const focusedWindow = BrowserWindow.getFocusedWindow();
//   const appName = app.name;

//   if (focusedWindow) {
//     const windowTitle = focusedWindow.getTitle();
//     if (!appUsageData[appName]) {
//       appUsageData[appName] = {};
//     }
//     if (!appUsageData[appName][windowTitle]) {
//       appUsageData[appName][windowTitle] = 0;
//     }
//     appUsageData[appName][windowTitle] += 1;
//     console.log(`Tracking app usage - App: ${appName}, Window: ${windowTitle}`);
//   }
// }

// app.on("ready", () => {
//   setInterval(trackAppUsage, 60000); // Track usage every minute
//   console.log("App usage tracking started.");
//   dialog.showMessageBox({
//     type: "info",
//     message: "App Usage Tracking",
//     detail: "Tracking started", // or "App usage data saved"
//   });
// });

// app.on("will-quit", () => {
//   // Save the app usage data to a JSON file
//   const jsonData = JSON.stringify(appUsageData);
//   fs.writeFileSync(path.join(__dirname, "appUsageData.json"), jsonData);
//   console.log("App usage data saved.");
// });
