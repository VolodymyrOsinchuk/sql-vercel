require("dotenv").config();
const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("Hello SQL Server");
});

app.get("/api", (req, res) => {
  res.send("API SQL Server");
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("Server listening on port " + port);
});
