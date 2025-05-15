const { app, BrowserWindow, ipcMain } = require('electron/main')
const path = require('node:path')
// set up path of config file
const fs = require('fs')
const defaultConfPath = path.join(__dirname, 'config.json');

// set up logging
const log = require('electron-log');

// get the username of the current user
const os = require('os');
const username = os.userInfo().username;


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

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  win.loadFile('index.html')
}

// Provide config to renderer
ipcMain.handle('get-config', () => {
  return readConfig(defaultConfPath);
});

// handle the event button-clicked send by renderer
ipcMain.on('button-clicked', (event, eventName, eventData) => {
  console.log(`Event received: ${eventName}`, eventData);
  log.info(`Event received: ${eventName}`, eventData);
});

app.whenReady().then(() => {
  console.log('Launched by:', username);
  log.info('Launched by:', username);
  createWindow()

  // Watch config file for changes
  fs.watchFile(defaultConfPath, { interval: 1000 }, () => {
    const updated = readConfig(defaultConfPath);
    if (updated && win) {
      win.webContents.send('config-updated', updated);
    }
  });

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})