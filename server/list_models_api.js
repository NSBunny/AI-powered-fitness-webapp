const https = require('https');
const fs = require('fs');
require('dotenv').config();

const apiKey = process.env.GEMINI_API_KEY;
const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;

fs.writeFileSync('api_response.txt', 'Request started\n');

https.get(url, (res) => {
    let data = '';
    res.on('data', (chunk) => {
        data += chunk;
    });
    res.on('end', () => {
        fs.appendFileSync('api_response.txt', `Status Code: ${res.statusCode}\n`);
        fs.appendFileSync('api_response.txt', `Response: ${data}\n`);
    });
}).on('error', (err) => {
    fs.appendFileSync('api_response.txt', `Error: ${err.message}\n`);
});
