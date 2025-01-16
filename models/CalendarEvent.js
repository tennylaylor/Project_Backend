const mongoose = require("mongoose");

const CalendarEventSchema = new mongoose.Schema({
  week: { type: String, required: true }, // Example: "Week of 2025-01-01"
  days: [
    {
      day: { type: String, required: true }, // Example: "Monday"
      events: [
        {
          time: { type: String, required: true }, // Example: "09:00 AM"
          description: { type: String, required: true },
        },
      ],
    },
  ],
});

module.exports = mongoose.model("CalendarEvent", CalendarEventSchema);
