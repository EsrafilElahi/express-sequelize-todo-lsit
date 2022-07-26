const Todo = require("../model/todo");
const throwError = require("../middleware/throwError");

const getAllTodos = async (req, res, next) => {
  try {
    const completedTodo = await Todo.count({ where: { completed: true } });
    const todos = await Todo.findAll();
    if (!todos) {
      throwError("not found todos", 404);
    }
    res.status(200).json({
      results: todos.length,
      completedTodos: completedTodo,
      remainedTodos: todos.length - completedTodo,
      data: todos,
    });
  } catch (err) {
    res.status(500).json({ msg: `error in get todos ${err}` });
    next(err);
  }
};

const createTodo = async (req, res, next) => {
  const { title, completed } = req.body;
  try {
    const createdTodo = await Todo.create({
      title,
      completed,
    });
    if (!createTodo) {
      throwError("did not created todo", 400);
    }
    res.status(201).json({ data: createdTodo });
  } catch (err) {
    res.status(500).json({ msg: `error in post todos ${err}` });
    next(err);
  }
};

const getTodo = async (req, res, next) => {
  const { id } = req.params;
  try {
    const todo = await Todo.findByPk(id);
    if (!todo) {
      throwError("not found", 404);
    }
    res.status(200).json({ data: todo });
  } catch (err) {
    res.status(500).json({ msg: `error in get todo id ${err}` });
    next(err);
  }
};

const updateTodo = async (req, res, next) => {
  const { id } = req.params;
  const { title, completed } = req.body;
  try {
    const todo = await Todo.findByPk(id);
    if (!todo) {
      throwError("not found", 404);
    }
    todo.title = title;
    todo.completed = completed;
    await todo.save();
    res.status(200).json({ data: todo });
  } catch (err) {
    res.status(500).json({ msg: `error in update todo ${err}` });
    next(err);
  }
};

const deleteTodo = async (req, res, next) => {
  const { id } = req.params;
  try {
    await Todo.destroy({ where: { id: id } });
    if (Todo.findByPk({ where: { id: id } })) {
      throwError("did not deleted the todo", 500);
    }
    res.status(200).json({ msg: `deleted todo with id ${id}` });
  } catch (err) {
    res.status(500).json({ msg: `error in delete todo ${err}` });
    next(err);
  }
};

module.exports = { getAllTodos, createTodo, getTodo, updateTodo, deleteTodo };
