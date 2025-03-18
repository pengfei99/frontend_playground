# Build electron app for delivery

There exists many tools which can build electron apps:
- Electron-Builder(Recommended)
- Electron-Forge
- Electron-Installer-Windows


## Use Electron-Builder

For now, it seems Electron-Builder provides best support for building electron apps. You can find their official doc [here](https://www.electron.build/)

The github page is [here](https://github.com/electron-userland/electron-builder)

```shell
# goto the project folder
cd /path/to/my-electron-app

# install electron builder
npm install --save-dev electron-builder

```

### Add build entry point command in package.json

```json
"scripts": {
  "dist": "electron-builder"
}
```

### Add build ocnfig

You can also configure how the build behaves. Below is an example

```json
"build": {
    "appId": "eu.casd.casd-secure-hub",
    "productName": "casd_secure_hub",
    "files": [
      "dist/**/*",
      "assets/**/*",
      "index.html",
      "main.js",
      "renderer.js",
      "style.css"
    ],
    "win": {
      "icon": "assets/bouclier.ico"
    },
    "mac": {
      "icon": "assets/bouclier.icns" 
    },
    "linux": {
      "icon": "assets/bouclier.png" 
    }
  }
```

### The complete package.json file 

```json
{
  "name": "casd_secure_hub",
  "version": "1.0.0",
  "description": "my first electron app ",
  "license": "MIT",
  "author": "pengfei liu",
  "type": "commonjs",
  "main": "main.js",
  "scripts": {
    "start": "electron .",
    "dist": "electron-builder",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "devDependencies": {
    "electron": "^35.0.2",
    "electron-builder": "^25.1.8"
  },
  "build": {
    "appId": "eu.casd.casd-secure-hub",
    "productName": "casd_secure_hub",
    "files": [
      "dist/**/*",
      "assets/**/*",
      "index.html",
      "main.js",
      "renderer.js",
      "style.css"
    ],
    "win": {
      "target": "portable",
      "icon": "assets/bouclier.ico"
    },
    "mac": {
      "icon": "assets/bouclier.icns" 
    },
    "linux": {
      "icon": "assets/bouclier.png" 
    }
  }
}

```

### Launch the build process

After running the below command, you will have a folder `win-upacked` generated under `dist`.

```shell
npm run dist
```


> You may have codesign error. I did not figure out how to remove this warning. This will not fail your build.