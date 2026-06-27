const sequelize = require('./config/database');

console.log('Testing connection to:', process.env.DATABASE_URL);

sequelize.authenticate()
    .then(() => {
        console.log('PostgreSQL Connected Successfully');
        process.exit(0);
    })
    .catch(err => {
        console.error('PostgreSQL Connection Failed:', err.message);
        process.exit(1);
    });
