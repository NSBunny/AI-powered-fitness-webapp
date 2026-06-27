const express = require('express');
const router = express.Router();
const User = require('../models/User');
const auth = require('../middleware/auth');

// @route   GET api/user/profile
// @desc    Get user profile and stats
// @access  Private
router.get('/profile', auth, async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id, {
            attributes: { exclude: ['password'] }
        });
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST api/user/stats
// @desc    Update user stats (workouts, calories, streak)
// @access  Private
router.post('/stats', auth, async (req, res) => {
    try {
        const { calories } = req.body;
        const user = await User.findByPk(req.user.id);

        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        // Update stats
        user.totalWorkouts += 1;
        user.caloriesBurned += parseInt(calories) || 0;

        // Streak logic
        const today = new Date();
        const lastWorkout = user.lastWorkoutDate ? new Date(user.lastWorkoutDate) : null;

        if (lastWorkout) {
            const diffTime = Math.abs(today - lastWorkout);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            if (diffDays === 1) {
                user.streak += 1;
            } else if (diffDays > 1) {
                user.streak = 1; // Reset streak if missed a day
            }
            // If diffDays === 0 (same day), do nothing to streak
        } else {
            user.streak = 1; // First workout
        }

        user.lastWorkoutDate = today;
        await user.save();

        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST api/user/plan
// @desc    Save current workout plan
// @access  Private
router.post('/plan', auth, async (req, res) => {
    try {
        const { plan } = req.body;
        const user = await User.findByPk(req.user.id);

        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        user.currentPlan = plan;
        await user.save();

        res.json(user.currentPlan);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
