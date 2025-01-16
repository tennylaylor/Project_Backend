const express = require("express");
const router = express.Router();
const {
  getEvents,
  addEvent,
  deleteEvent,
} = require("../controllers/calendarController");

// Route to get all events
router.get("/", getEvents);

// Route to add an event to a specific day
router.post("/:day", addEvent);

// Route to delete an event from a specific day
router.delete("/:day/:eventId", deleteEvent);

module.exports = router;
