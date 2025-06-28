const express = require('express');
const { getProfile, updateProfile } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Protected route: get current user's profile
router.get('/profile', protect, getProfile);
// Protected route: update current user's profile
router.put('/profile', protect, updateProfile);

module.exports = router; 