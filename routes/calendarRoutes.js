const express = require("express");
const {
  getWeekEvents,
  addEventToDay,
} = require("../controllers/calendarController");

const router = express.Router();

// Get events for a specific week
router.get("/:week", getWeekEvents);

// Add an event to a specific day
router.post("/:week/:day", addEventToDay);

// DELETE /api/calendar/:day/:eventId
router.delete("/:day/:eventId", async (req, res) => {
  const { day, eventId } = req.params;

  try {
    const calendar = await Calendar.findOne();
    if (!calendar) return res.status(404).json({ error: "Calendar not found" });

    const dayEvents = calendar.days.find((d) => d.day === day);
    if (!dayEvents) return res.status(404).json({ error: "Day not found" });

    dayEvents.events = dayEvents.events.filter(
      (event) => event._id.toString() !== eventId
    );
    await calendar.save();

    res
      .status(200)
      .json({
        message: "Event removed successfully",
        events: dayEvents.events,
      });
  } catch (error) {
    console.error("Error removing event:", error);
    res.status(500).json({ error: "Failed to remove event" });
  }
});

module.exports = router;
