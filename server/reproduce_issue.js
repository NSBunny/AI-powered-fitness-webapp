const fs = require('fs');
fs.writeFileSync('debug_log.txt', 'Script started\n');

try {
    require('dotenv').config();
    fs.appendFileSync('debug_log.txt', 'Dotenv loaded\n');
    const { generateWorkoutPlan, generateMealPlan } = require('./services/aiService');
    fs.appendFileSync('debug_log.txt', 'Service loaded\n');

    async function testGeneration() {
        fs.appendFileSync('debug_log.txt', 'Testing Workout Generation...\n');
        try {
            const workout = await generateWorkoutPlan(
                { age: 25, gender: 'Male', fitnessLevel: 'Beginner' },
                'Build muscle'
            );
            fs.appendFileSync('debug_log.txt', 'Workout Plan Generated Successfully\n');
        } catch (error) {
            fs.appendFileSync('debug_log.txt', 'Workout Generation Failed: ' + error.message + '\n');
        }
    }

    testGeneration().catch(err => fs.appendFileSync('debug_log.txt', 'Top level error: ' + err.message + '\n'));
} catch (err) {
    fs.appendFileSync('debug_log.txt', 'Fatal error: ' + err.message + '\n');
}
