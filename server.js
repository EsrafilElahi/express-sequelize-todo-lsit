const express = require("express");
const path = require("path");
const cors = require("cors");
const dotenv = require("dotenv").config();
const sequelize = require("./db/connectDB");
const todoRouter = require("./routes/todo");
const errorHandler = require("./controller/errorHandler");

const app = express();
const port = process.env.PORT || 5050;

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cors({ origin: `http://localhost:5000/` }));
app.use("/todos", todoRouter);
app.use(errorHandler);

app.get("/", (req, res) => {
  res.send("Home Page");
});

// connect db
sequelize
  .authenticate()
  .then(() => {
    console.log("db connected!");
    app.listen(process.env.PROJECT_PORT);
  })
  .catch((err) => {
    console.log("err db :", err);
  });
