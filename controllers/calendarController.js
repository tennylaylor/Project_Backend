const CalendarEvent = require("../models/CalendarEvent");

// Get all events for the week
exports.getEvents = async (req, res) => {
  try {
    const events = await CalendarEvent.find();
    const organizedEvents = events.reduce((acc, event) => {
      acc[event.day] = acc[event.day] || [];
      acc[event.day].push(event);
      return acc;
    }, {});
    res.json(organizedEvents);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch events" });
  }
};

// Add an event to a specific day
exports.addEvent = async (req, res) => {
  const { day } = req.params;
  const { time, description } = req.body;

  if (!day || !time || !description) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const event = new CalendarEvent({ day, time, description });
    await event.save();
    const updatedEvents = await CalendarEvent.find({ day });
    res.status(201).json({ events: updatedEvents });
  } catch (error) {
    res.status(400).json({ error: "Failed to add event" });
  }
};

// Delete an event from a specific day
exports.deleteEvent = async (req, res) => {
  const { day, eventId } = req.params;

  try {
    const event = await CalendarEvent.findById(eventId);
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }

    if (event.day !== day) {
      return res.status(400).json({ error: "Day mismatch for the event" });
    }

    await CalendarEvent.findByIdAndDelete(eventId);
    const updatedEvents = await CalendarEvent.find({ day });
    res.status(200).json({ events: updatedEvents });
  } catch (error) {
    res.status(400).json({ error: "Failed to delete event" });
  }
};
