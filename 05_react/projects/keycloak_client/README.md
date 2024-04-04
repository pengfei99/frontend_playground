# React app with keycloak integration

In this project, we will create a simple react app with keycloak integration for user authentication.

It uses three js packages:
- keycloak-js
- primereact
- primeflex

> We suppose you already have a keycloak server up and running.

## Create a keycloak client

Create a keycloak client with the below configuration. The valid uri need to be changed if your react app does not run
on the same server of keycloak. The `Authenticatoin Flow` can be multiple choice, but it must inclue `standard flow` 
for the react app example to work. The PKCE method `S256` is important which we will see in the react-js client configuration

> Note this client does not requrire authentication which is not recommanded for production.

```text
Client ID                : react-client
Valid http redirect URI  : http://localhost:3000/*
Post logout redirect URI : http://localhost:3000/
Web Origins              : http://localhost:3000
Authenticatoin Flow      : Standard Flow
PKCE Challenge Method    : S256

```

## Create the react app

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

```shell
# create the react project skeleton
npx create-react-app keycloak_client

# go to the project folder
cd keycloak_client

# Install the dependencies
# the keycloak-js version must match the keycloak server version
npm i keycloak-js@23.0.4
npm install primereact
npm install primeflex

# replace your App.js by the App.js provided in this repo. I will explain how to modify it to match your keycloak server in the next section
```

In the project directory, you can run:

```shell
npm start
```

## Configure the react-js 

As I mentioned before, this app relies on the `keycloak-js` package to communicate with the keycloak server. So the most important part of this app is to 
configure the keycloak-js client to connect to the server and perform the actions such as `obtain access token`, `verify access token`, `renew token`.

The below code shows how to create a keycloak-js client and how to configure it. It has three main parts:
- configuration parameters:
- client creation
- client initialization

```javascript
// a dict to store the params which the keycloak-js client needs to connect to the keycloak server
// url is the keycloak server url
// onLoad option: defines the actions to perform when the page is loaded. It can have two options either ‘check-sso’ or ‘login-required’
//            With ‘login-required’ option, the app will check whether user is authenticated against 
//            the keycloak server and if not user will be redirect to the login page. No user can load the React 
//            application on the browser without sucessfully authenticated.
//            With ‘check-sso’ option, the app will silently check whether user is authenticated but does not force user to authenticate immediately. 
//            User can later authenticate.
// KeycloakResponseType option: Defines which Authorization Grant the keycloak will use. In this tutorial, we set it to code since we are using authorization code flow.
// pkceMethod option: Defines the PKCE Challenge Method during the authorization code flow. Here we set it to S256.
let initOptions = {
  url: 'http://keycloak.casd.local/',
  realm: 'examples',
  clientId: 'react-client',
  onLoad: 'login-required', // check-sso | login-required
  KeycloakResponseType: 'code',
  silentCheckSsoRedirectUri: window.location.origin + "/silent-check-sso.html", 
  checkLoginIframe: false,
  pkceMethod: 'S256'
}

// create an instance of Keycloak-js
let kc = new Keycloak(initOptions);

// init the instance, note we have to set some param with init() method, because, the constructor does not take
// all params at the instance creation.
kc.init({
   onLoad: initOptions.onLoad,
   KeycloakResponseType: initOptions.KeycloakResponseType,
   silentCheckSsoRedirectUri: initOptions.silentCheckSsoRedirectUri, 
   checkLoginIframe: initOptions.checkLoginIframe,
   pkceMethod: initOptions.pkceMethod
}).then((auth) => {
  if (!auth) {
    window.location.reload();
  } else {
    console.info("Authenticated");
    console.log('auth', auth)
    console.log('Keycloak', kc)
    kc.onTokenExpired = () => {
      console.log('token expired')
    }
  }
}, () => {
  console.error("Authenticated Failed");
});
```

After that we can add a list of buttons

```javascript
const LOGOUT_REDIRECT_URI = 'http://10.50.2.80:3000/'
...

<div className="grid">
        <div className="col">
        <Button onClick={() => { setInfoMessage(kc.authenticated ? 'Authenticated: TRUE' : 'Authenticated: FALSE') }} className="m-1" label='Is Authenticated' />
         
          <Button onClick={() => { kc.login() }} className='m-1' label='Login' severity="success" />
          <Button onClick={() => { setInfoMessage(kc.token) }} className="m-1" label='Show Access Token' severity="info" />
          <Button onClick={() => { setInfoMessage(JSON.stringify(kc.tokenParsed)) }} className="m-1" label='Show Parsed Access token' severity="info" />
          <Button onClick={() => { setInfoMessage(kc.isTokenExpired(5).toString()) }} className="m-1" label='Check Token expired' severity="warning" />
          <Button onClick={() => { kc.updateToken(10).then((refreshed)=>{ setInfoMessage('Token Refreshed: ' + refreshed.toString()) }, (e)=>{setInfoMessage('Refresh Error')}) }} className="m-1" label='Update Token (if about to expire)' />  {/** 10 seconds */}
          <Button onClick={() => { kc.logout({ redirectUri: LOGOUT_REDIRECT_URI }) }} className="m-1" label='Logout' severity="danger" />
          
</div>
```

- 1st button check if user is authenticated: `kc.authenticated` is a boolean value
- 2nd button starts the login process: `kc.login()` method starts the process.
- 3nd button get the access token: `kc.token` is the raw access token value (encoded in base64)
- 4th button get the parsed access token: `kc.tokenParsed` is the parse token value (in json)
- 5th button check if token will expired within 5 seconds: `kc.isTokenExpired(5)` returns a boolean value
- 6th button update access token if it is going to expire within 10 seconds: `kc.updateToken(10)` returns a boolean value. True if refreshed, False if not.
- 7th button starts the logout process: `kc.logout({ redirectUri: LOGOUT_REDIRECT_URI })`


## Trouble shoot

### CORS header 'Access-Control-Allow-Origin' missing

The response to the CORS request is missing the required Access-Control-Allow-Origin header, which is used to determine whether or not the resource can be accessed by content operating within the current origin.

> The keycloak server (nginx revers proxy) must add the appropriate `Access-Control-Allow-Origin` into the HTTP header. Check my Keycloak server doc for more details https://github.com/pengfei99/LinuxAdminSys/blob/main/docs/security/03.Install_keycloak.md.