const mongoose = require("mongoose");

const MagnetSchema = new mongoose.Schema({
  text: { type: String, required: true },
  x: { type: Number, required: true },
  y: { type: Number, required: true },
});

module.exports = mongoose.model("Magnet", MagnetSchema);
