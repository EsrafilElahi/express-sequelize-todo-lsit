const Todo = require("../model/todo");

const getAllTodos = async (req, res) => {
  try {
    const completedTodo = await Todo.count({ where: { completed: true } });
    const todos = await Todo.findAll();
    res.status(200).json({
      results: todos.length,
      completedTodos: completedTodo,
      remainedTodos: todos.length - completedTodo,
      data: todos,
    });
  } catch (err) {
    res.status(500).json({ msg: `error in get todos ${err}` });
  }
};

const createTodo = async (req, res) => {
  const { id, title, completed, createdAt, updatedAt } = req.body;
  try {
    const createdTodo = await Todo.create({
      id,
      title,
      completed,
      createdAt,
      updatedAt,
    });
    res.status(201).json({ data: createdTodo });
  } catch (err) {
    res.status(500).json({ msg: `error in post todos ${err}` });
  }
};

const getTodo = async (req, res) => {
  const { id } = req.params;
  try {
    const todo = await Todo.findByPk(id);
    res.status(200).json({ data: todo });
  } catch (err) {
    res.status(500).json({ msg: `error in get todo id ${err}` });
  }
};

const updateTodo = async (req, res) => {
  const { id } = req.params;
  const { title, completed } = req.body;
  try {
    const todo = await Todo.findByPk(id);
    todo.title = title;
    todo.completed = completed;
    await todo.save();
    res.status(200).json({ data: todo });
  } catch (err) {
    res.status(500).json({ msg: `error in update todo ${err}` });
  }
};

const deleteTodo = async (req, res) => {
  const { id } = req.params;
  try {
    await Todo.destroy({ where: { id: id } });
    res.status(200).json({ msg: `deleted todo with id ${id}` });
  } catch (err) {
    res.status(500).json({ msg: `error in delete todo ${err}` });
  }
};

module.exports = { getAllTodos, createTodo, getTodo, updateTodo, deleteTodo };
