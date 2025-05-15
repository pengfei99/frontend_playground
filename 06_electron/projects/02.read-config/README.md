# Read config app 

In this tutorial, we will learn 
- how to read custom configuration file from the local filesystem, generate some dynamic pages with the config.
- how to write information in a log file in the local filesystem

## 1. Setup a electron project skeleton

## 2. Read config file

```js
const fs = require('fs')
const configPath = path.join(__dirname, 'config.json');
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