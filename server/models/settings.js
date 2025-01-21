const sequelize = require('../database')
const {DataTypes} = require('sequelize')

const Settings = sequelize.define('settings', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    maxAttemps: {
        type: DataTypes.INTEGER,
        defaultValue: 1
    },
    feedbackMode: {
        type: DataTypes.ENUM('detailed', 'basic', 'none'),
        defaultValue: 'basic'
    }
})

module.exports = Settings;