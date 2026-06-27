const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require('dotenv');
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function listModels() {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" }); // Dummy model to get client
        // There isn't a direct listModels on the client instance in the simplified SDK usage sometimes, 
        // but let's try to use the API directly if the SDK doesn't expose it easily or check SDK docs.
        // Actually, the SDK doesn't have a direct listModels method on the top level object in some versions.
        // Let's try a simple fetch to the API endpoint to be sure, or just try a standard model like 'gemini-1.0-pro'.

        // Alternative: Try to generate content with a very standard model name.
        console.log("Testing gemini-1.5-flash...");
        try {
            const modelFlash = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
            await modelFlash.generateContent("Test");
            console.log("gemini-1.5-flash is AVAILABLE");
        } catch (e) {
            console.log("gemini-1.5-flash failed: " + e.message);
        }

        console.log("Testing gemini-pro...");
        try {
            const modelPro = genAI.getGenerativeModel({ model: "gemini-pro" });
            await modelPro.generateContent("Test");
            console.log("gemini-pro is AVAILABLE");
        } catch (e) {
            console.log("gemini-pro failed: " + e.message);
        }

    } catch (error) {
        console.error("Error:", error);
    }
}

listModels();
