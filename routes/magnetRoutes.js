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
    const newMagnet = new Magnet(req.body); // Create a new magnet using the request body

    const savedMagnet = await newMagnet.save(); // Save the new magnet to the database
    res.status(201).json(savedMagnet); // Return the saved magnet with a 201 Created status
  } catch (error) {
    res.status(400).json({ error: "Failed to add magnet" });
  }
});

// Update magnet position or text
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params; // Extract magnet ID from the request parameters
    const updatedMagnet = await Magnet.findByIdAndUpdate(
      id,
      req.body,
      { new: true } // update the magnet position and update the text
    );
    if (!updatedMagnet) {
      return res.status(404).json({ error: "Magnet not found" });
    }
    res.json(updatedMagnet); // Return the updated magnet
  } catch (error) {
    res.status(400).json({ error: "Failed to update magnet" });
  }
});

// Delete a magnet
router.delete("/:id", async (req, res) => {
  try {
    await Magnet.findByIdAndDelete(req.params.id); // Delete the magnet by ID
    res.json({ message: "Magnet deleted" }); // Return success message
  } catch (error) {
    res.status(400).json({ error: "Failed to delete magnet" });
  }
});

module.exports = router;
