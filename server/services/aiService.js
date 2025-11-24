const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const generateWorkoutPlan = async (userProfile, goals) => {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

        const prompt = `Generate a detailed weekly workout plan for a user with the following profile:
        - Age: ${userProfile.age}
        - Gender: ${userProfile.gender}
        - Weight: ${userProfile.weight}kg
        - Height: ${userProfile.height}ft
        - Fitness Level: ${userProfile.fitnessLevel}
        - Goals: ${goals}
        
        Format the response as a JSON object where keys are days of the week (e.g., "Monday", "Tuesday").
        Each value must be an object containing a property "Exercises" which is an array of objects.
        Each exercise object must have: "Exercise" (name of exercise), "Sets" (number or string), "Reps" (string or number).
        
        Example format:
        {
          "Monday": {
            "Exercises": [
              { "Exercise": "Pushups", "Sets": "3", "Reps": "12" }
            ],
            "Focus": "Upper Body",
            "Duration": "45 mins"
          }
        }
        
        Do not include markdown formatting like \`\`\`json. Return only the JSON string.`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // Basic cleanup to ensure valid JSON if the model adds extra text
        const jsonStr = text.replace(/```json/g, '').replace(/```/g, '').trim();

        return JSON.parse(jsonStr);
    } catch (error) {
        console.error("AI Generation Error:", error);
        throw new Error(`Failed to generate workout plan: ${error.message}`);
    }
};

const generateMealPlan = async (userProfile, preferences) => {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

        const prompt = `Generate a detailed weekly meal plan for a user with the following profile:
        - Dietary Preferences: ${preferences}
        - Calorie Target: ${userProfile.calorieTarget || 'Maintenance'}
        
        Format the response as a JSON object with days of the week as keys and meals (breakfast, lunch, dinner, snacks) as values. Do not include markdown formatting like \`\`\`json.`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        const jsonStr = text.replace(/```json/g, '').replace(/```/g, '').trim();

        return JSON.parse(jsonStr);
    } catch (error) {
        console.error("AI Generation Error:", error);
        throw new Error(`Failed to generate meal plan: ${error.message}`);
    }
};

module.exports = { generateWorkoutPlan, generateMealPlan };
