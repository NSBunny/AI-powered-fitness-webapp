const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    totalWorkouts: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    caloriesBurned: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    streak: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    lastWorkoutDate: {
        type: DataTypes.DATE
    },
    currentPlan: {
        type: DataTypes.JSONB, // Use JSONB for better performance with JSON data in Postgres
        allowNull: true
    }
});

module.exports = User;
