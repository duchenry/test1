const { error } = require("console");
const express = require("express");
const dotenv = require("dotenv");
const { graphqlHTTP } = require("express-graphql");
const mongoose = require("mongoose");
const schema = require("./schema/schema");
const app = express();
dotenv.config();
mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(3000, () => {
      console.log("Hello");
    });
  })
  .catch((error) => {
    console.log(error);
  });
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);
mongoose.set("useFindAndModify", false);
