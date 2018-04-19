/* eslint-disable no-console */
const express = require("express");
const bodyParser = require("body-parser");
const config = require("../../config.json");

const api = require("./api");

const app = express();
app.use(bodyParser.json());

app.use("/api", api);
app.use("/", express.static("./public"));

const port = config.port || 3000;
app.listen(port, () => {
  console.log(`ready and listening on http://localhost:${port}`);
});
