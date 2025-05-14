const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  getConfig: () => ipcRenderer.invoke('get-config'),
   onConfigUpdated: (callback) => ipcRenderer.on('config-updated', (_, data) => callback(data)),
});
