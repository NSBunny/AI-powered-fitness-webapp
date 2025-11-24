const express = require('express');
const router = express.Router();
const { generateWorkoutPlan } = require('../services/aiService');
// const auth = require('../middleware/auth'); // TODO: Add auth middleware

router.post('/generate', async (req, res) => {
    try {
        const { userProfile, goals } = req.body;
        // In a real app, fetch userProfile from DB using req.user.id

        const plan = await generateWorkoutPlan(userProfile, goals);
        res.json(plan);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server Error: ' + err.message });
    }
});

module.exports = router;
