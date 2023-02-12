const { ipcMain, app, BrowserWindow, BrowserView } = require("electron");
const path = require("path");

if (require("electron-squirrel-startup")) {
  app.quit();
}

const DEFAULT_WIDTH = 1277;
const DEFAULT_HEIGHT = 756;

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    titleBarStyle: "hidden",
    titleBarOverlay: {
      height: 32,
    },

    width: DEFAULT_WIDTH,
    height: DEFAULT_HEIGHT,

    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },

    show: false,
  });

  mainWindow.resizable = false;

  let loading = new BrowserView({
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  mainWindow.setBrowserView(loading);
  loading.setBounds({
    x: 0,
    y: 0,
    width: DEFAULT_WIDTH,
    height: DEFAULT_HEIGHT,
  });
  loading.webContents.loadFile(
    path.join(__dirname, "application/loading.html")
  );
  loading.webContents.on("dom-ready", () => {
    mainWindow.show();
  });

  ipcMain.handle("ping", () => {});

  ipcMain.handle("endloading", () => {
    loading.webContents.send("onEndLoading", true);
  });

  ipcMain.handle("closeLoading", () => {
    mainWindow.resizable = true;
    mainWindow.removeBrowserView(loading);
  });

  mainWindow.loadFile(path.join(__dirname, "application/index.html"));

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();
};

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
