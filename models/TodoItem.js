const mongoose = require("mongoose");

const TodoItemSchema = new mongoose.Schema({
  task: { type: String, required: true }, // Task description
  completed: { type: Boolean, default: false }, // Completion status
  priority: { type: String, enum: ["low", "medium", "high"], default: "low" }, // Priority level
  createdAt: { type: Date, default: Date.now }, // Timestamp
});

module.exports = mongoose.model("TodoItem", TodoItemSchema);
