const mongoose = require("mongoose");
// Define the schema for a weekly calendar event
const WeeklyCalendarEventSchema = new mongoose.Schema({
  day: {
    type: String,
    required: true,
    enum: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
  },
  time: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Export the model for use in other parts of the application
// The model name is "WeeklyCalendarEvent" and is linked to the defined schema
module.exports = mongoose.model(
  "WeeklyCalendarEvent",
  WeeklyCalendarEventSchema
);
