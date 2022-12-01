require("dotenv").config();
const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.json({ message: "Hello SQL Server" });
});

app.get("/api", (req, res) => {
  res.json({ message: "API SQL Server" });
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("Server listening on port " + port);
});
