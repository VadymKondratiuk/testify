const sequelize = require('../database')
const {DataTypes} = require('sequelize')

const TestAttempts = sequelize.define('test_attempts', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    startTime: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    endTime: {
        type: DataTypes.DATE,
    },
    score: {
        type: DataTypes.DECIMAL(5, 2)
    }

})

module.exports = TestAttempts;