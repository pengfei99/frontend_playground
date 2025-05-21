const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('node:path')
// set up path of config file
const fs = require('fs')
const defaultConfPath = path.join(__dirname, 'config.json');

// define function with parameter configPath
function readConfig(configPath) {
    // Checks if the file specified by configPath exists on the file system
  if (!fs.existsSync(configPath)) {
    // if not log error msg to console and log file
    const msg = `Config file not found: ${configPath}`;
    console.error(msg);
    log.error(msg);
    return null;
  }

  try {
    // Reads the contents of the file at configPath synchronously
    const raw = fs.readFileSync(configPath, 'utf-8');
    // parse raw content to json object
    const config = JSON.parse(raw);
    // check if the json object is valid (not null and has type object)
    if (typeof config !== 'object' || config === null) {
      throw new Error('Invalid config structure: expected an object');
    }

    return config;

  } catch (err) {
    // if err is catched, log error to consol and log file
    const msg = `Failed to read or parse config file: ${configPath}`;
    console.error(msg, err.message);
    log.error(msg, err);
    return null;
  }
}

function createWindow() {
  const win = new BrowserWindow({
    width: 600,
    height: 400,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  win.loadFile('index.html');

  // ⬇️ Open DevTools after the page loads
  win.webContents.openDevTools();
}

// Provide config to renderer
ipcMain.handle('get-config', () => {
  return readConfig(defaultConfPath);
});

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
