const express = require('express');

const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
const sequelize = require('./config/database');

// Database Connection
sequelize.sync()
    .then(() => console.log('PostgreSQL Connected & Models Synced'))
    .catch(err => console.error('Database Connection Error:', err));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/workout', require('./routes/workout'));
app.use('/api/meal', require('./routes/meal'));

app.get('/', (req, res) => {
    res.send('AI Fitness App Backend is Running');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
