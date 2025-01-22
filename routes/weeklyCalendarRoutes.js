const express = require("express");
const router = express.Router();
const {
  getWeeklyEvents,
  addWeeklyEvent,
  deleteWeeklyEvent,
  updateEvent,
} = require("../controllers/weeklyCalendarController");

router.get("/", getWeeklyEvents);
router.post("/:day", addWeeklyEvent);
router.delete("/:day/:eventId", deleteWeeklyEvent);
router.put("/:day/:eventId", updateEvent);

module.exports = router;
