# IPC communication application example

In electron [01.Introduction.md](../../docs/01.Introduction.md), we have explained the main and render process must use IPC to communicate. In this tutorial, we will show how to do that.


## IPC Architecture Overview

|Communication Direction	|Method|
|-------------------------|------|
|Renderer → Main	|ipcRenderer.send()|
|Main → Renderer	|webContents.send()|
|Two-way (async reply)	|ipcRenderer.invoke() + ipcMain.handle()|


## Setup project skeleton

```shell
# 1. basic npm projct
mkdir ipc-com-app
cd ipc-com-app

npm init

# answer the question in the prompt, and save it
# now you have a basic npm project(a package.json file will be generated)

# 2. add electron support
npm install electron --save-dev

# edit the package.json, add the below line in "scripts" section of package.json
"start": "electron .", 

```

## Edit the main.js

You can find the full code in [main.js](./main.js). Here I only highlgith the code which send and receive message

```js
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
```