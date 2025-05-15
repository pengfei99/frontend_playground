const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  sendLog: (msg) => ipcRenderer.send('log-message', msg),
  getTime: () => ipcRenderer.invoke('get-time'),
  onMainMessage: (callback) => ipcRenderer.on('from-main', (event, data) => callback(data))
});
