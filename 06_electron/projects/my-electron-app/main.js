const { app, BrowserWindow, Menu } = require('electron')
const path = require("path");

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    icon: path.join(__dirname, 'assets', 'bouclier.svg'),
    webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
      },
  })

  win.loadFile('index.html');
  // Remove default menu bar
  Menu.setApplicationMenu(null);
}

app.whenReady().then(() => {
  createWindow()

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