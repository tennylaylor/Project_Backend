const WeeklyCalendarEvent = require("../models/WeeklyCalendarEvent");

// Fetch all weekly events
exports.getWeeklyEvents = async (req, res) => {
  try {
    const events = await WeeklyCalendarEvent.find();
    const groupedEvents = events.reduce((acc, event) => {
      acc[event.day] = acc[event.day] || [];
      acc[event.day].push(event);
      return acc;
    }, {});
    res.json(groupedEvents);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch weekly events" });
  }
};

// Add a new event for a specific day
exports.addWeeklyEvent = async (req, res) => {
  const { day } = req.params;
  const { time, description } = req.body;

  if (!day || !time || !description) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const newEvent = new WeeklyCalendarEvent({ day, time, description });
    await newEvent.save();
    const updatedEvents = await WeeklyCalendarEvent.find({ day });
    res.status(201).json({ events: updatedEvents });
  } catch (error) {
    res.status(400).json({ error: "Failed to add weekly event" });
  }
};

// Delete an event for a specific day
exports.deleteWeeklyEvent = async (req, res) => {
  const { day, eventId } = req.params;

  try {
    const event = await WeeklyCalendarEvent.findById(eventId);
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }

    if (event.day !== day) {
      return res.status(400).json({ error: "Day mismatch for the event" });
    }

    await WeeklyCalendarEvent.findByIdAndDelete(eventId);
    const updatedEvents = await WeeklyCalendarEvent.find({ day });
    res.status(200).json({ events: updatedEvents });
  } catch (error) {
    res.status(400).json({ error: "Failed to delete weekly event" });
  }
};
