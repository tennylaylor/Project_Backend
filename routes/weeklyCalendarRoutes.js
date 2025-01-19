const express = require("express");
const router = express.Router();
const {
  getWeeklyEvents,
  addWeeklyEvent,
  deleteWeeklyEvent,
} = require("../controllers/weeklyCalendarController");

router.get("/", getWeeklyEvents);
router.post("/:day", addWeeklyEvent);
router.delete("/:day/:eventId", deleteWeeklyEvent);

module.exports = router;
