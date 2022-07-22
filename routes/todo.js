const express = require("express");
const router = express.Router();
const Todo = require("../model/todo");
const {
  getAllTodos,
  createTodo,
  getTodo,
  updateTodo,
  deleteTodo,
} = require("../controller/todo");

// routes
router.get("/", getAllTodos);

router.post("/", createTodo);

router.get("/:id", getTodo);

router.put("/:id", updateTodo);

router.delete("/:id", deleteTodo);

module.exports = router;
