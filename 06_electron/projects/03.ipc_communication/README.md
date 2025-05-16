# IPC communication application example

In electron [01.Introduction.md](../../docs/01.Introduction.md), we have explained the main and render process must use IPC to communicate. In this tutorial, we will show how to do that.


## 1. IPC Architecture Overview

|Communication Pattern	|Method| 
|-------------------------|------|
|Renderer → Main	|ipcRenderer.send() sends message from the Render side, ipcMain.on() receives message and treate it on the main side|
|Main → Renderer	|webContents.send() sends message from the main to render, ipcRender.on() receives message on the render side|
|Request-responce (async reply)	|ipcRenderer.invoke() + ipcMain.handle()|


### 1.1 IPC one way messaging pattern(renderer to main) 

`ipcRenderer.send('channel-name', msg)` sends message to `main process` from the `renderer process`, and forget messages. It does not wait for a response from the `main process`. To distinguish messages of different purposes, each message is 
associated with a `channel`.

On the `main process` we must have this line `ipcMain.on('channel-name', (event, arg)` to listen on the channel to be able to receive the message.

This pattern is used for `logging renderer side information, renderer notifications, or updates renderer information` that don't need acknowledgment from the main side.

> The `ipcRenderer.send('channel-name', msg)` can be defined in `renderer.js` or `preload.js`.

### 1.2 IPC one way messaging pattern(main to renderer) 

In this pattern, it's the `main process`  that initiates communication to the renderer with `webContents.send('channel-name', msg)`. 

On the `renderer process`(`renderer.js` or `preload.js`), we must have `ipcRenderer.on('channel-name', msg)` to listen on the channel to receive message from the `main process`.

This pattern is used for the `main process` to send notifications, updates, or events that the UI should react to. For example, to render ` system events, timer completions, or background task results` on the UI.

### 1.3 IPC two way pattern (Request-responce)



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

- **ipcMain**: is the main module for handling IPC messages, it provides 
- 