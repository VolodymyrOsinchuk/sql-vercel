require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const path = require("path");

const app = express();

// import data base
const supabase = require("./db");

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "public")));

app.get("/", (req, res) => {
  res.json({ message: "Hello from backend and Supabase !!!" });
});

app.get("/api/v1/users", async (req, res) => {
  const { data, error } = await supabase.from("users").select();

  if (error) {
    return res.status(404).json({ error });
  }
  res.status(200).json({ data });
});

app.get("/api/v1/users/:id", async (req, res) => {
  console.log("req.params.id", req.params.id);
  const { data, error } = await supabase
    .from("users")
    .select()
    .eq("id", req.params.id);

  if (error) {
    return res.status(404).json({ error });
  }
  res.status(200).json({ data });
});

app.post("/api/v1/users", async (req, res) => {
  const { error } = await supabase.from("users").insert({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });
  if (error) {
    res.send(error);
  }
  res.status(201).json({ message: "Created User" });
});

app.get("/api/v1", (req, res) => {
  res.json({ message: "API SQL Server Supabase" });
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("Server listening on port " + port);
});
