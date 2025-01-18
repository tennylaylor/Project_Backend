const express = require("express");
const router = express.Router();
const {
  getWeeklyEvents,
  addWeeklyEvent,
  deleteWeeklyEvent,
} = require("../controllers/weeklyCalendarController");

// Get all weekly events
router.get("/", getWeeklyEvents);

// Add an event for a specific day
router.post("/:day", addWeeklyEvent);

// Delete an event for a specific day
router.delete("/:day/:eventId", deleteWeeklyEvent);

module.exports = router;
