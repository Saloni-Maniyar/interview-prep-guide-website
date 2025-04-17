const express = require('express');
const router = express.Router();
const Roadmap = require('../models/Roadmap');

// Get all roadmaps
router.get('/roadmaps', async (req, res) => {
    try {
        const roadmaps = await Roadmap.find();
        res.json(roadmaps);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Add a new roadmap
router.post('/roadmap', async (req, res) => {
    try {
        const newRoadmap = new Roadmap(req.body);
        await newRoadmap.save();
        res.status(201).json(newRoadmap);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Edit a roadmap
router.put('/roadmap/:id', async (req, res) => {
    try {
        const updatedRoadmap = await Roadmap.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedRoadmap);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a roadmap
router.delete('/roadmap/:id', async (req, res) => {
    try {
        await Roadmap.findByIdAndDelete(req.params.id);
        res.json({ message: 'Roadmap deleted successfully' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
