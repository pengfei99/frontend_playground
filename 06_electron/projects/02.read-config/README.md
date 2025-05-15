# Read config app 

In this tutorial, we will learn 
- how to read custom configuration file from the local filesystem, generate some dynamic pages with the config.
- how to write information in a log file in the local filesystem

## 1. Setup a electron project skeleton

Use the below command to build a electron project skeleton

```shell

```

## 2. Use config file to update the UI

To update the UI with config file, we need to do two things:
- read the config file and build a config object (main process)
- render the UI with config object

### 2.1 Read the config file

In the `main.js`, we need to add the below line to read the config.json file

```js
const fs = require('fs')
const configPath = path.join(__dirname, 'config.json');

function readConfig(configPath){
  const raw = fs.readFileSync(configPath, 'utf-8');
  // parse raw content to json object
  const config = JSON.parse(raw);
  return config;
}

//send the config object to renderer process
ipcMain.handle('get-config', () => {
  return readConfig(defaultConfPath);
});
```

### 2.2 Render the UI

In `renderer.js`, write the below code


```js
// define a function that parses the config object, and render the UI with the parsed result
function render(config) {
  document.title = config.title || 'App';
  document.getElementById('page-title').innerText = config.title || 'Untitled';

  const container = document.getElementById('content');
  container.innerHTML = '';

  config.widgets.forEach(widget => {
    let el;

    switch (widget.type) {
      case 'text':
        el = document.createElement('p');
        el.textContent = widget.value;
        break;
      case 'link':
        el = document.createElement('a');
        el.href = widget.url;
        el.textContent = widget.label;
        el.target = '_blank';
        break;
      case 'button':
        el = document.createElement('button');
        el.className = widget.className || 'btn';

        // Create button content with optional image
        if (widget.image) {
          // Create a container for better alignment of image and text
          const contentContainer = document.createElement('span');
          contentContainer.className = 'button-content';

          // Create and configure the image
          const img = document.createElement('img');
          img.src = widget.image;
          img.alt = widget.imageAlt || '';
          img.className = 'button-icon';

          // Set image size if provided
          if (widget.imageWidth) img.width = widget.imageWidth;
          if (widget.imageHeight) img.height = widget.imageHeight;

          // Add image to container
          contentContainer.appendChild(img);

          // Add a space between image and text
          const spacer = document.createElement('span');
          spacer.innerHTML = '&nbsp;';
          contentContainer.appendChild(spacer);

          // Add text if provided
          if (widget.label) {
            const textSpan = document.createElement('span');
            textSpan.textContent = widget.label;
            contentContainer.appendChild(textSpan);
          }

          // Add the content container to the button
          el.appendChild(contentContainer);
        } else {
          // No image, just set the text content
          el.textContent = widget.label || 'Button';
        }
        // 
        if (widget.action) {
          el.addEventListener('click', () => {
            if (widget.action === 'send-event') {
              // Send an event to the main process
              window.electronAPI.sendEvent(widget.eventName, widget.eventData);
            } 
          });
        }
        break;
    }

    if (el) container.appendChild(el);
  });
}

// Accesses the electronAPI object that was exposed to the renderer process through the preload script
// getConfig() and onConfigUpdated() are methods defined in the preload script
// getConfig() is an asynchronous function that retrieves the configuration object from the main process
// .then(render) attaches a success callback to the Promise returned by getConfig(). It means that when the Promise 
// resolves, the render function will be called with the configuration object as its argument.
// This is equivalent to .then(config => render(config)) but shorter, 
window.electronAPI.getConfig().then(render);
window.electronAPI.onConfigUpdated(render);
```



## 3. Write log 

There are many ways to write log in a file. For example, you can define a function to write log to a file

```js
const fs = require('fs');
const path = require('path');

const logPath = path.join(__dirname, 'app.log');

function logToFile(message) {
    const time = new Date().toISOString();
    fs.appendFileSync(logPath, `[${time}] ${message}\n`, 'utf8');
}

// Call logToFile('Some debug message') anywhere in the main process.
```


In this tutorial, we will use `electron-log`. 

`electron-log` is the simple logging module for Electron/Node.js/NW.js application. It has no dependencies, and does not require complicated configuration.
You can find more details in their [official package page](https://www.npmjs.com/package/electron-log)

```shell
# install the module
# you must run this command in your project folder
npm install electron-log --save

# If you accidentally installed electron-log in a subfolder or globally, uninstall and reinstall properly:
npm uninstall -g electron-log

# you can check if the moudle is installed or not
ls node_modules/electron-log
```
>
### 3.1 Log levels

`electron-log` supports the following log levels:

- error
- warn
- info
- verbose
- debug
- silly

### 3.2 Write logs

In your `main process(main.js)`, you can use below code to write logs

```js 
// import 
const log = require('electron-log');
log.info('App started');
```

To better illustrate how to do logging in a real world example. Check the below readConfig function
```js
// Imports Node.js's built-in fs (file system) module for read and write files
const fs = require('fs');
// Imports Node.js's built-in path module for handling file and directory paths in a cross-platform way
const path = require('path');
//  logging library specifically designed for Electron applications
const log = require('electron-log');

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
```