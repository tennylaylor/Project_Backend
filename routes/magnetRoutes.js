const express = require("express");
const router = express.Router();
const Magnet = require("../models/Magnet");

// Get all magnets
router.get("/", async (req, res) => {
  try {
    //Fetch all magnets from the database
    const magnets = await Magnet.find();
    res.json(magnets);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch magnets" });
  }
});

// Add a new magnet
router.post("/", async (req, res) => {
  try {
    const newMagnet = new Magnet(req.body);

    const savedMagnet = await newMagnet.save(); // Save the new magnet to the database
    res.status(201).json(savedMagnet);
  } catch (error) {
    res.status(400).json({ error: "Failed to add magnet" });
  }
});

// Update magnet position or text
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedMagnet = await Magnet.findByIdAndUpdate(
      id,
      req.body,
      { new: true } // update the magnet position and update the text
    );
    if (!updatedMagnet) {
      return res.status(404).json({ error: "Magnet not found" });
    }
    res.json(updatedMagnet);
  } catch (error) {
    res.status(400).json({ error: "Failed to update magnet" });
  }
});

// Delete a magnet
router.delete("/:id", async (req, res) => {
  try {
    await Magnet.findByIdAndDelete(req.params.id);
    res.json({ message: "Magnet deleted" });
  } catch (error) {
    res.status(400).json({ error: "Failed to delete magnet" });
  }
});

module.exports = router;
