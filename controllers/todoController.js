const TodoItem = require("../models/TodoItem");

// Get all to-do items
exports.getTodos = async (req, res) => {
  try {
    const todos = await TodoItem.find();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch to-dos" });
  }
};

// Add a new to-do item
exports.addTodo = async (req, res) => {
  try {
    const newTodo = new TodoItem(req.body);
    const savedTodo = await newTodo.save();
    res.status(201).json(savedTodo);
  } catch (error) {
    res.status(400).json({ error: "Failed to add to-do" });
  }
};

// Update a to-do item
exports.updateTodo = async (req, res) => {
  try {
    const updatedTodo = await TodoItem.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedTodo);
  } catch (error) {
    res.status(400).json({ error: "Failed to update to-do" });
  }
};

// Delete a to-do item
exports.deleteTodo = async (req, res) => {
  try {
    await TodoItem.findByIdAndDelete(req.params.id);
    res.json({ message: "To-do deleted" });
  } catch (error) {
    res.status(400).json({ error: "Failed to delete to-do" });
  }
};
