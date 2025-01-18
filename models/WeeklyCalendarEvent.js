const mongoose = require("mongoose");

const WeeklyCalendarEventSchema = new mongoose.Schema({
  day: { type: String, required: true },
  time: { type: String, required: true },
  description: { type: String, required: true },
});

module.exports = mongoose.model(
  "WeeklyCalendarEvent",
  WeeklyCalendarEventSchema
);
