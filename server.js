const express = require("express");
const path = require("path");
const cors = require("cors");
const dotenv = require("dotenv").config();
const sequelize = require("./db/connectDB");
const todoRouter = require("./routes/todo");
const errorHandler = require("./middleware/errorHandler");

const app = express();
const port = process.env.PROJECT_PORT || 5050;

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

app.all("*", (req, res) => {
  res.send("404 not found");
});

// connect db
sequelize.sync({ force: true });
sequelize
  .authenticate()
  .then(() => {
    console.log("db connected!");
    app.listen(port, () => {
      console.log(`server running on port ${port}`);
    });
  })
  .catch((err) => {
    console.log("unable to connect db :", err);
  });
