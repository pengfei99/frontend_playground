# Node.js tutorial

## 1. Setup dev env for nodeJs


You can find the complete installation doc on all OS [here](https://github.com/nodesource/distributions#debinstall)

In our case, it's an unbuntu, you can follow the below steps:


```shell
# get the source
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash - &&\

# install the nodejs
sudo apt-get install -y nodejs

# check the installation
node --version

# the default package manager of Nodejs is npm. So it's intalled with node
# you can check your npm version
npm -v

# update the npm version
sudo npm install -g npm@latest
```

Here we choose the version 18.x, because it's the LTS version. The latest 19.x is not LTS.

## 2.Quick start

Create a Node.js file named `myfirst.js`, and add the following code:

```js
var http = require('http');

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end('Hello World!');
}).listen(8080);
```

on your shell run below
```shell
node myfirst.js
```

Start your internet browser, and type in the address: http://localhost:8080

## 3. Node.js Module

You can consider Node.js modules like JS libraries, which contains a set of functions you want to include in your application.

Node.js has a set of `built-in modules` which you can use without any further installation.
Look at the [Built-in Modules Reference](https://www.w3schools.com/nodejs/ref_modules.asp) for a complete list of modules. 

### include a module

Let's re-examine the above code
```js
//include http module
var http = require('http');

// call function of http module. The createServer function creates a server
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end('Hello World!');
}).listen(8080);
```

### Create your own Module

Check [src/L02](./src/L02/) for complete code source.

First we use `exports` to build a module, which contains one funciton. 
Create a `myfirstmodule.js` file, and copy below content in it.
```js
exports.myDateTime=function(){
    return Date();
};
```

Create a `myapp.js` file and copy below code init

```js

var http = require('http');
// import myfirstmodule with name dt
var dt=require('./myfirstmodule');

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  // call the funciton of myfirstmodule
  res.write("The current date and time: "+dt.myDateTime());
  res.end('Hello World!');
}).listen(8080);
```

For more tutorial. please visit https://www.w3schools.com/nodejs/nodejs_filesystem.asp


## 4. Manage node package


### 4.1 NPM
The default Node Package (i.e. Javascript package manager ) Manager is called **NPM**. NPM is installed when NodeJS is installed on a machine.

It comes with a command-line interface (CLI) used to interact with the online database of NPM. , and it hosts public and private 'packages.' To add or update packages, we use the NPM CLI to interact with this database. 


### 4.2 YARN

Yarn is a newer alternative of NPM, it apppeared as an attempt to solve some of the problems with npm and althought npm is struggling to keep up and introduces its counter-solutions with each new update, it is still not enough.

- there is a single npm registry of packages, which is unreliable in case of any performance issues (which often take place)
- network is required to install packages
- If you compare Yarn vs npm in terms of the CLI side of things, Yarn has a cleaner input of CLI commands
- Yarn vs npm in terms of security: Yarn is stronger here as well, although npm offers some built-in assessments and warning, it also allows packages to run code while being installed


### 4.3 NPX

NPX stands for Node Package eXecute. It is simply an NPM package runner. It allows developers to execute any Javascript Package available on the NPM registry without even installing it. NPX is installed automatically with NPM version 5.2.0 and above.

```shell
npx -v 
```
