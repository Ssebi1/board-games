
const express = require('express');
const router = express.Router();
const badgeController = require('../controllers/badgeController');

// GET all badges
router.get('/', badgeController.getBadges);

// GET a specific badge by ID
router.get('/:id', badgeController.getBadgeById);

// POST a new badge
router.post('/', badgeController.createBadge);

// PUT/update a badge by ID
router.put('/:id', badgeController.updateBadge);

// DELETE a badge by ID
router.delete('/:id', badgeController.deleteBadge);

module.exports = router;
