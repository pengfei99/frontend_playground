import React, { useState } from 'react';
import './App.css';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import '/node_modules/primeflex/primeflex.css'
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';

import Keycloak from 'keycloak-js';

const LOGOUT_REDIRECT_URI = 'http://10.50.2.80:3000/'

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

function App() {

  const [infoMessage, setInfoMessage] = useState('');

  return (
    <div className="App">
      {/* <Auth /> */}
      <div className='grid'>
        <div className='col-12'>
          <h1>React App with keycloak integration</h1>
        </div>
        <div className='col-12'>
          <h1 id='app-header-2'>Possible actions</h1>
        </div>
      </div>
       {/* a grid of buttons */} 
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
      </div>

      {/* <div className='grid'>
      <div className='col'>
        <h2>Is authenticated: {kc.authenticated}</h2>
      </div>
        </div> */}


      <div className='grid'>
        <div className='col-2'></div>
        <div className='col-8'>
        <h3>Console output</h3>
          <Card>
            <p style={{ wordBreak: 'break-all' }} id='infoPanel'>
              {infoMessage}
            </p>
          </Card>
        </div>
        <div className='col-2'></div>
      </div>



    </div>
  );
}


export default App;