const express = require('express');
const router = express.Router();

let tasks = []; // In-memory array to hold tasks
let nextId = 1; // ID counter for tasks

// GET all tasks
router.get('/', (req, res) => {
  res.json(tasks);
});

// POST a new task
router.post('/', (req, res) => {
  const newTask = { id: nextId++, ...req.body };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// PUT (edit) a task
router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = tasks.findIndex(task => task.id === id);
  if (index === -1) {
    return res.status(404).json({ message: 'Task not found' });
  }
  tasks[index] = { ...tasks[index], ...req.body }; // Update task
  res.json(tasks[index]);
});

// DELETE a task
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = tasks.findIndex(task => task.id === id);
  if (index === -1) {
    return res.status(404).json({ message: 'Task not found' });
  }
  tasks.splice(index, 1); // Remove task
  res.status(204).send(); // No content
});

module.exports = router;
