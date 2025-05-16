# IPC communication application example

In electron [01.Introduction.md](../../docs/01.Introduction.md), we have explained the main and render process must use IPC to communicate. In this tutorial, we will show how to do that.


## 1. IPC Architecture Overview

| Communication Pattern          | Method                                                                                                              |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------- |
| Renderer → Main                | ipcRenderer.send() sends message from the Render side, ipcMain.on() receives message and treate it on the main side |
| Main → Renderer                | webContents.send() sends message from the main to render, ipcRender.on() receives message on the render side        |
| Request-responce (async reply) | ipcRenderer.invoke() + ipcMain.handle()                                                                             |


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

In this pattern, one (in this example is the renderer process)  that initiates communication with `ipcRenderer.invoke('channel-name')`, the `invoke()` means the `renderer process` await for a responce. 

On the `main process` side, we have `ipcMain.handle('channel-name', () => {return val;});`, it listens on the `channel-name`, if a request is received, a responce will be returned.

On the  `renderer process` side, we have `const time = await window.api.getTime();` to get the value of the main process responce.


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
  // Sets up a timer to delay the execution of the callback function,  the delay is 3000 milliseconds (3 seconds)
  setTimeout(() => {
    // win is a reference to a BrowserWindow instance
    // webContents is the web contents object associated with the window
    // .send() sends a message to the renderer process
    // 'from-main' is the channel name
    // 'Hello from main process' is the message being sent
    win.webContents.send('from-main', 'Hello from main process');
  }, 3000);
```

**ipcMain** is the main module for handling IPC messages in the `main process`, it provides:
- **ipcMain.on(channel, listener)**: Listens for asynchronous messages from renderer processes. The listener function is called with (event, ...args) when a message arrives. It handles messages sent via ipcRenderer.send()

- **ipcMain.handle(channel, handler)**: registers a handler for invocations from renderer processes. The handler is called with (event, ...args) and should return a value or Promise. It handles calls from ipcRenderer.invoke()

- **ipcMain.handleOnce(channel, handler)**: Like handle() but removes the handler after first invocation
- ETC.


## Edit the preload.js

The `preload.js` creates a **secure bridge** between an Electron app's `renderer process (frontend)` and `main process (backend)`. 

```js
const { contextBridge, ipcRenderer } = require('electron');
// create `API object` named **api** that will be accessible in the renderer process via `window.api`
contextBridge.exposeInMainWorld('api', {
  //  sends a one-way asynchronous message to the main process through a channel named 'log-message'
  sendLog: (msg) => ipcRenderer.send('log-message', msg),
  //  sends a request to the main process and waits for a response (returns a Promise). It uses the 'get-time' channel.
  getTime: () => ipcRenderer.invoke('get-time'),
  // that registers a callback to listen for messages from the main process on the 'from-main' channel. When a message arrives, it calls the provided callback with just the data (hiding the event object)
  onMainMessage: (callback) => ipcRenderer.on('from-main', (event, data) => callback(data))
});

```

**ipcRenderer** is the main module for handling IPC messages in the `renderer process`, it provides:
- **ipcRenderer.send(channel, ...args)**: Sends a one-way asynchronous message to the main process and does not wait for a response
- **ipcRenderer.invoke(channel, ...args)**: Sends a message and expects a response (returns a Promise). The main process must handle this with ipcMain.handle()
- **ipcRenderer.on(channel, listener)**: Listens for messages from the main process on a specific channel. The listener function is called with (event, ...args) when a message arrives
- ETc.
- 
## Edit the renderer.js

```js
// Finds a DOM element with the ID 'send' (a button)
// Adds a click event listener to this element
document.getElementById('send').addEventListener('click', () => {
  // When clicked, it calls the sendLog function from the API bridge
  window.api.sendLog('Hello from Renderer');
});

// Finds a DOM element with the ID 'time' (another button)
// Adds a click event listener to this element
document.getElementById('time').addEventListener('click', async () => {
  // When clicked, it:
  // - Calls the getTime function from the API bridge (which returns a Promise)
  // - Awaits the response from the main process
  // - Updates the text content of an element with ID 'output' to display the returned time
  const time = await window.api.getTime();
  document.getElementById('output').innerText = `Time: ${time}`;
});

// Sets up a listener for messages from the main process using the onMainMessage function
// When the main process sends a message through the 'from-main' channel:
// - The callback function receives the message content
// - It updates the text content of the 'output' element to display what the main process sent
window.api.onMainMessage((msg) => {
  document.getElementById('output').innerText = `Main says: ${msg}`;
});

```

## Edit the index.html

```html
<!DOCTYPE html>
<html>
  <body>
    <h1>IPC Demo</h1>
    <button id="send">Send Log</button>
    <button id="time">Get Time</button>
    <div id="output"></div>
    <script src="renderer.js"></script>
  </body>
</html>

```