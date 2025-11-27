const express = require('express');

const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(
    cors({
        origin: process.env.CORS_ORIGIN || 'http://localhost:5173', // Allow requests from this origin
        methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed HTTP methods
        credentials: true, // Allow credentials (cookies, authorization headers, etc.)
    })
);
app.use(express.json());

// Database Connection
const sequelize = require('./config/database');

// Database Connection
// Database Connection
sequelize.sync({ alter: true })
    .then(() => console.log('PostgreSQL Connected & Models Synced'))
    .catch(err => console.error('Database Connection Error:', err));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/user', require('./routes/user'));
app.use('/api/workout', require('./routes/workout'));
app.use('/api/meal', require('./routes/meal'));

app.get('/', (req, res) => {
    res.send('AI Fitness App Backend is Running');
});

app.get('/api/health', async (req, res) => {
    try {
        await sequelize.authenticate();
        res.json({ status: 'ok', database: 'connected', timestamp: new Date() });
    } catch (err) {
        res.status(500).json({ status: 'error', database: 'disconnected', error: err.message });
    }
});

if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

module.exports = app;
