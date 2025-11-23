const express = require('express');
const router = express.Router();
const { generateMealPlan } = require('../services/aiService');

router.post('/generate', async (req, res) => {
    try {
        const { userProfile, preferences } = req.body;

        const plan = await generateMealPlan(userProfile, preferences);
        res.json(plan);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
