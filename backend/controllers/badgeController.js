const Badge = require('../models/badgeModel');

// Create a new badge
const createBadge = async (req, res, next) => {
    try {
        const { name, description } = req.body;

        // Check if name and description are provided
        if (!name || !description) {
            return res.status(400).json({ message: 'Name and description are required' });
        }

        const badge = await Badge.create(req.body);
        res.status(201).json(badge);
    } catch (error) {
        next(error);
    }
};


// Get all badges
const getBadges = async (req, res, next) => {
    try {
        const badges = await Badge.find();
        res.status(200).json(badges);
    } catch (error) {
        next(error);
    }
};

// Get a badge by ID
const getBadgeById = async (req, res, next) => {
    try {
        const badge = await Badge.findById(req.params.id);
        if (!badge) {
            return res.status(404).json({ message: 'Badge not found' });
        }
        res.status(200).json(badge);
    } catch (error) {
        next(error);
    }
};

// Update a badge by ID
const updateBadge = async (req, res, next) => {
    try {
        const { name, description } = req.body;

        // Check if name and description are provided
        if (!name || !description) {
            return res.status(400).json({ message: 'Name and description are required' });
        }

        const badge = await Badge.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!badge) {
            return res.status(404).json({ message: 'Badge not found' });
        }
        res.status(200).json(badge);
    } catch (error) {
        next(error);
    }
};

// Delete a badge by ID
const deleteBadge = async (req, res, next) => {
    try {
        const badge = await Badge.findByIdAndDelete(req.params.id);
        if (!badge) {
            return res.status(404).json({ message: 'Badge not found' });
        }
        res.status(200).json({ message: 'Badge deleted' });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createBadge,
    getBadges,
    getBadgeById,
    updateBadge,
    deleteBadge
};
