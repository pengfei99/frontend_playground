const { app, BrowserWindow, ipcMain } = require('electron/main')
const path = require('node:path')
const fs = require('fs')
const configPath = path.join(__dirname, 'config.json');


function readConfig() {
  try {
    const data = fs.readFileSync(configPath, 'utf-8');
    return JSON.parse(data);
  } catch (e) {
    console.error('Error reading config:', e);
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
  return readConfig();
});

app.whenReady().then(() => {
  createWindow()

  // Watch config file for changes
  fs.watchFile(configPath, { interval: 1000 }, () => {
    const updated = readConfig();
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