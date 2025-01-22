const Magnet = require("../models/Magnet");

// Update magnet text
exports.updateMagnetText = async (req, res) => {
  try {
    const { text } = req.body;
    const updatedMagnet = await Magnet.findByIdAndUpdate(
      req.params.id,
      { text },
      { new: true }
    );
    if (!updatedMagnet) {
      return res.status(404).json({ error: "Magnet not found" });
    }
    res.json(updatedMagnet);
  } catch (error) {
    res.status(400).json({ error: "Failed to edit magnet text" });
  }
};
