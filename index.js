require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const path = require("path");

const app = express();

// import data base
// const supabase = require("./db");
const sequelize = require("./db");

// const authRoutes = require("./routes/auth");
// const userRoutes = require("./routes/user");

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "public")));

app.get("/", (req, res) => {
  res.json({ message: "Hello from backend and Supabase !!!" });
});

// app.use("/api/v1/auth", authRoutes);
// app.use("/api/v1/users", userRoutes);

app.get("/api/v1", (req, res) => {
  res.json({ message: "API SQL Server Supabase" });
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("Server listening on port " + port);
});

// sequelize
//   .sync()
//   // .sync({ force: true })
//   .then((result) =>
//     console.log("DB is connected with host: ", result.options.host)
//   )
//   .catch((err) => {
//     console.warn("Error syncing", err);
//   });
