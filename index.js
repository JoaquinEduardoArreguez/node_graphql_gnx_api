const express = require("express");
const app = express();

const gnx = require("@simtlix/gnx");

const graphqlHTTP = require("express-graphql");

const mongoose = require("mongoose");

mongoose.connect(
  "mongodb://localhost:27017,localhost:27018,localhost:27019/example",
  { replicaSet: "rs" }
);

mongoose.connection.once("open", () => {
  console.log("Connected to DataBase");
});

const types = require("./types");
const schema = gnx.createSchema(types);

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
