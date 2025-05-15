const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

app.whenReady().then(() => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    }
  });

  win.loadFile('index.html');

  // Renderer → Main (asynchronous)
  ipcMain.on('log-message', (event, arg) => {
    console.log('Renderer says:', arg);
  });

  // Renderer → Main (two-way)
  ipcMain.handle('get-time', () => {
    return new Date().toISOString();
  });

  // Main → Renderer
  setTimeout(() => {
    win.webContents.send('from-main', 'Hello from main process');
  }, 3000);
});
