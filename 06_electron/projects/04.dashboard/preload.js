const { contextBridge, ipcRenderer} = require('electron');

console.log('load preload file');

contextBridge.exposeInMainWorld('api', {
  getConfig: () => ipcRenderer.invoke('get-config'),
});

