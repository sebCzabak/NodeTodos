const express = require('express');
const router = express.Router();
const Todo = require('../models/todo');
const Joi = require('joi');

// Walidacja zadania
const todoSchema = Joi.object({
  title: Joi.string().min(3),
  description: Joi.string().allow(''),
  completed: Joi.boolean(),
});

// Pobierz wszystkie zadania użytkownika
router.get('/', async (req, res) => {
  try {
    const todos = await Todo.find({ userId: req.user.id });
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Dodaj nowe zadanie
router.post('/', async (req, res) => {
  const { error } = todoSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const todo = new Todo({
    title: req.body.title,
    description: req.body.description,
    userId: req.user.id,
  });

  try {
    const newTodo = await todo.save();
    res.status(201).json(newTodo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Pobierz jedno zadanie
router.get('/:id', getTodo, (req, res) => {
  res.json(res.todo);
});

// Aktualizuj zadanie
router.patch('/:id', getTodo, async (req, res) => {
  const { error } = todoSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  if (req.body.title != null) {
    res.todo.title = req.body.title;
  }
  if (req.body.description != null) {
    res.todo.description = req.body.description;
  }
  if (req.body.completed != null) {
    res.todo.completed = req.body.completed;
  }

  try {
    const updatedTodo = await res.todo.save();
    res.json(updatedTodo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Usuń zadanie
router.delete('/:id', getTodo, async (req, res) => {
  try {
    await res.todo.deleteOne();
    res.json({ message: 'Deleted Todo' });
  } catch (err) {
    console.error('Error during deletion:', err);
    res.status(500).json({ message: err.message });
  }
});

// Middleware do pobierania zadania po ID
async function getTodo(req, res, next) {
  let todo;
  try {
    todo = await Todo.findOne({ _id: req.params.id, userId: req.user.id });
    if (todo == null) {
      return res.status(404).json({ message: 'Cannot find todo' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.todo = todo;
  next();
}

module.exports = router;
