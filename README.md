## Node GraphQL GNX API
Workshop , develop an API using graphql and gnx (a tool from SimtLix)

Needed:

**nvm**  
> npm i nvm

**run-rs**
>npm i run-rs

**mongo-express**
>npm i mongo-express

**graphql-iso-date**
>npm install --save graphql-iso-date

**Nodemon** *(as development dependency)*
>npm i --save-dev nodemon  

* *To run with **npm run dev** : on package.json , inside scripts , add:*  
  >"dev": "nodemon index.js"

**Download npm dependencies**
>npm install

### To run this code
* Start mongobd with replica sets automagicly
  >run-rs or npm run mongo_init 

  *or, in case run-rs is not on the path*  
  >./node_modules/.bin/run-rs or npm run mongo_init

* Start node app
  >npm run dev

* To test GraphQl queries through GraphiQl access
  >localhost:3000/graphql or npm run mongo_explorer