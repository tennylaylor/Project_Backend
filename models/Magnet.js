const mongoose = require("mongoose");

const MagnetSchema = new mongoose.Schema({
  text: { type: String, required: true }, // Magnet text (required
  x: { type: Number, required: true }, // Magnet's x-coordinate on the board (required)
  y: { type: Number, required: true }, // Magnet's y-coordinate on the board (required)
});

module.exports = mongoose.model("Magnet", MagnetSchema);
