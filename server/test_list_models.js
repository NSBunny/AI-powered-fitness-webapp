const axios = require('axios');
const dotenv = require('dotenv');
const fs = require('fs');

dotenv.config();

const log = (msg) => {
    console.log(msg);
    fs.appendFileSync('model_list_output.txt', msg + '\n');
};

const apiKey = process.env.GEMINI_API_KEY;

async function listModels() {
    try {
        log(`Querying models with key: ${apiKey.substring(0, 5)}...`);
        const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;
        const res = await axios.get(url);
        log("Models available:");
        if (res.data && res.data.models) {
            res.data.models.forEach(m => {
                log(`- ${m.name} (${m.supportedGenerationMethods.join(', ')})`);
            });
        } else {
            log("No models found in response.");
        }
    } catch (e) {
        log(`Error listing models: ${e.message}`);
        if (e.response) {
            log(`Status: ${e.response.status}`);
            log(`Data: ${JSON.stringify(e.response.data)}`);
        }
    }
}

listModels();
