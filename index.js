require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const path = require("path");
const cookieParser = require("cookie-parser");

const app = express();

// import data base
// const supabase = require("./db");
const sequelize = require("./db");
// const pool = require("./db");

// const authRoutes = require("./routes/auth");
// const userRoutes = require("./routes/user");

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}
// console.log("process.env.NODE_ENV", process.env.NODE_ENV);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.resolve(__dirname, "public")));

// app.use("/api/v1/auth", authRoutes);
// app.use("/api/v1/users", userRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Hello from backend and Supabase !!!" });
});

app.get("/favicon.ico", function (req, res) {
  res.status(204);
  res.end();
});

app.get("/api/v1", (req, res) => {
  res.json({ message: "API SQL Server Sequelize" });
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("Server listening on port " + port);
});

// sequelize
//   .authenticate()
//   // .sync({ force: true })
//   .then(() =>
//     // console.log("DB is connected with host: ", result.options.host)
//     console.log("DB is connected")
//   )
//   .catch((err) => {
//     console.warn("Error syncing", err);
//   });
