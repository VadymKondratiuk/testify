const sequelize = require('../database')
const {DataTypes} = require('sequelize')

const Tests = sequelize.define('tests', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING
    },
    timeLimit: {
        type: DataTypes.INTEGER,
        defaultValue: null,
    },
    isRandomized: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
})

module.exports = Tests;