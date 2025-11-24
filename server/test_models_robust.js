const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require('dotenv');
const fs = require('fs');

dotenv.config();

const log = (msg) => {
    console.log(msg);
    fs.appendFileSync('model_test_output.txt', msg + '\n');
};

const apiKey = process.env.GEMINI_API_KEY;
log(`API Key loaded: ${apiKey ? 'YES' : 'NO'}`);
if (apiKey) log(`API Key length: ${apiKey.length}`);

const genAI = new GoogleGenerativeAI(apiKey);

async function test() {
    const models = ["gemini-1.5-flash", "gemini-pro", "gemini-1.0-pro"];

    for (const modelName of models) {
        log(`Testing model: ${modelName}`);
        try {
            const model = genAI.getGenerativeModel({ model: modelName });
            const result = await model.generateContent("Hello");
            const response = await result.response;
            log(`SUCCESS: ${modelName} - Response: ${response.text().substring(0, 20)}...`);
        } catch (e) {
            log(`FAILED: ${modelName} - Error: ${e.message}`);
        }
    }
}

test();
