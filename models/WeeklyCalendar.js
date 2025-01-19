const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
  time: { type: String, required: true },
  description: { type: String, required: true },
});

const WeeklyCalendarSchema = new mongoose.Schema({
  day: { type: String, required: true, unique: true },
  events: [EventSchema],
});

module.exports = mongoose.model("WeeklyCalendar", WeeklyCalendarSchema);
