const axios = require('axios');
const fs = require('fs');

function log(message) {
    console.log(message);
    try {
        fs.appendFileSync('test_output.txt', message + '\n');
    } catch (e) {
        console.error('Error writing to file:', e);
    }
}

log('Script started');

async function testRegistration() {
    try {
        log('Attempting to register user...');
        const res = await axios.post('http://localhost:5000/api/auth/register', {
            username: `testuser_${Date.now()}`,
            email: `testuser_${Date.now()}@example.com`,
            password: 'password123'
        });
        log('Registration Successful: ' + JSON.stringify(res.data));
    } catch (err) {
        if (err.response) {
            log('Registration Failed with Response: ' + err.response.status + ' ' + JSON.stringify(err.response.data));
        } else if (err.request) {
            log('No response received (Server might be down): ' + err.message);
        } else {
            log('Error setting up request: ' + err.message);
        }
    }
}

testRegistration().then(() => log('Script finished'));
