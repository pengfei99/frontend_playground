# React app keycloak integration

In this tutorial, I'm going to explain how to use `Keycloak` to secure a ReactJs application

## 1. Prerequise

Here, we suppose you have already an keycloak running instance. In our tutorial, we suppose the keycloak server runs
on the url http://keycloak.casd.org

You need to create a new Realm, and inside this Realm, you will create a client. In our tutorial, we named our realm as
`examples`, and the client has the ID called `app-web-react`.

If your react app runs in the same server as your keycloak, In the Root/Home/Admin URL, you can use the value `http://localhost:3000`

If it runs on a remote server, In the Root/Home/Admin URL, you need to use the remote server ip address, for example, the value can be
`http://10.50.2.80:3000`


In the advanced settings of the client, you need to set `Proof Key for Code Exchange Code Challenge Method` to **S256** to avoid plain text key exchange.

## 2. Create a react aaplication

Rune below command on your terminal to create the React App.

```shell
npx create-react-app keycloak_client
cd keycloak_client

# In order to connect with Keycloak, I am using keycloak-js npm package. There are few react-keycloak integration 
# libraries available and some of them are working as wrappers around this npm module. This module (keycloak-js) 
# is maintained by the same people who maintain the Keycloak project.

# Since I am using keycloak server 23.0.4, npm package version should match the same version.
npm i keycloak-js@23.0.4

# The below two prime react packages are for adding style. Those are optional.
npm install primereact
npm install primeflex
```


 



