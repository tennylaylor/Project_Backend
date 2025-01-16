const CalendarEvent = require("../models/CalendarEvent");

// Get events for a specific week
exports.getWeekEvents = async (req, res) => {
  try {
    const { week } = req.params;
    const calendar = await CalendarEvent.findOne({ week });
    res.json(calendar || { week, days: [] });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch week events" });
  }
};

// Add an event to a specific day
exports.addEventToDay = async (req, res) => {
  try {
    const { week, day } = req.params;
    const { time, description } = req.body;

    let calendar = await CalendarEvent.findOne({ week });
    if (!calendar) {
      calendar = new CalendarEvent({
        week,
        days: [{ day, events: [{ time, description }] }],
      });
    } else {
      const dayData = calendar.days.find((d) => d.day === day);
      if (dayData) {
        dayData.events.push({ time, description });
      } else {
        calendar.days.push({ day, events: [{ time, description }] });
      }
    }

    await calendar.save();
    res.status(201).json(calendar);
  } catch (error) {
    res.status(400).json({ error: "Failed to add event to day" });
  }
};
