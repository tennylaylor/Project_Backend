const express = require("express");
const router = express.Router();
const {
  getTodos,
  addTodo,
  updateTodo,
  deleteTodo,
} = require("../controllers/todoController");

router.get("/", getTodos);
router.post("/", addTodo);
router.put("/:id", updateTodo);
router.delete("/:id", deleteTodo);
//------------

// Test route
router.get("/test", (req, res) => {
  res.json({ message: "Frontend and backend are connected!" });
});

//------------

module.exports = router;
