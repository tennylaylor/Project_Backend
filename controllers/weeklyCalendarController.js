const WeeklyCalendarEvent = require("../models/WeeklyCalendarEvent");

// Fetch all weekly events
exports.getWeeklyEvents = async (req, res) => {
  try {
    const events = await WeeklyCalendarEvent.find().sort({ time: 1 });

    // Group events by day
    const groupedEvents = events.reduce((acc, event) => {
      if (!acc[event.day]) {
        acc[event.day] = [];
      }
      acc[event.day].push(event);
      return acc;
    }, {});

    res.json(groupedEvents);
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ error: "Failed to fetch weekly events" });
  }
};

// Add a new event for a specific day
exports.addWeeklyEvent = async (req, res) => {
  try {
    const { day } = req.params;
    const { time, description } = req.body;

    // Validate required fields
    if (!day || !time || !description) {
      return res.status(400).json({
        error: "Missing required fields",
        details: {
          day: !day ? "Day is required" : null,
          time: !time ? "Time is required" : null,
          description: !description ? "Description is required" : null,
        },
      });
    }

    // Create and save the new event
    const newEvent = new WeeklyCalendarEvent({
      day,
      time,
      description: description.trim(),
    });

    await newEvent.save();

    // Fetch updated events for the day
    const updatedEvents = await WeeklyCalendarEvent.find({ day }).sort({
      time: 1,
    });

    res.status(201).json({ events: updatedEvents });
  } catch (error) {
    console.error("Error adding event:", error);
    res.status(400).json({
      error: "Failed to add weekly event",
      details: error.message,
    });
  }
};

// Delete an event
exports.deleteWeeklyEvent = async (req, res) => {
  try {
    const { day, eventId } = req.params;

    const deletedEvent = await WeeklyCalendarEvent.findOneAndDelete({
      _id: eventId,
      day: day,
    });

    if (!deletedEvent) {
      return res.status(404).json({ error: "Event not found" });
    }

    // Fetch updated events for the day
    const updatedEvents = await WeeklyCalendarEvent.find({ day }).sort({
      time: 1,
    });

    res.json({ events: updatedEvents });
  } catch (error) {
    console.error("Error deleting event:", error);
    res.status(400).json({ error: "Failed to delete weekly event" });
  }
};
