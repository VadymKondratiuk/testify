const sequelize = require('../database')
const {DataTypes} = require('sequelize')

const Responses = sequelize.define('responses', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    openResponse: {
        type: DataTypes.STRING,
    },

})

module.exports = Responses;