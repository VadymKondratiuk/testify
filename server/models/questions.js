const sequelize = require('../database')
const {DataTypes} = require('sequelize')

const Questions = sequelize.define('questions', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    questionText: {
        type: DataTypes.STRING,
        allowNull: false
    },
    questionType: {
        type: DataTypes.ENUM('multipleChoice', 'singleChoice', 'open', 'matching'),
        allowNull: false,
        defaultValue: 'singleChoice'
    }
})

module.exports = Questions;