const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();
const fs = require('fs');

async function listModels() {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    // Access the model via the API directly if SDK doesn't expose listModels easily, 
    // but the SDK usually has a way. 
    // Actually, for the JS SDK, it might not be directly on genAI.
    // Let's try to just use the error message suggestion or try a few common ones.

    // The JS SDK doesn't seem to have a simple listModels method on the top level client in older versions,
    // but let's try to assume it might be on the model manager or similar.
    // However, since I can't easily browse documentation, I'll try to use a known working model name.

    // Common names: "gemini-1.5-flash", "gemini-1.5-pro", "gemini-1.0-pro"

    const models = ["gemini-1.5-flash", "gemini-1.5-pro", "gemini-1.0-pro", "gemini-pro"];

    let log = "";

    for (const modelName of models) {
        log += `Testing model: ${modelName}\n`;
        try {
            const model = genAI.getGenerativeModel({ model: modelName });
            const result = await model.generateContent("Hello");
            log += `  SUCCESS: ${modelName} works.\n`;
        } catch (error) {
            log += `  FAILED: ${modelName} - ${error.message}\n`;
        }
    }

    fs.writeFileSync('model_check_log.txt', log);
}

listModels().catch(err => fs.writeFileSync('model_check_log.txt', "Fatal: " + err.message));
