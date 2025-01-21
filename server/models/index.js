const Answers = require('./answers')
const Questions = require('./questions')
const Responses = require('./responses')
const Settings  = require('./settings')
const TestAttempts = require('./testAttempts')
const Tests  = require('./tests')
const Users  = require('./users')

Users.hasMany(Tests)
Tests.belongsTo(Users)

Tests.hasMany(Questions, {onDelete: 'CASCADE'})
Questions.belongsTo(Tests)

Questions.hasMany(Answers, {onDelete: 'CASCADE'})
Answers.belongsTo(Questions)

Users.hasMany(TestAttempts)
TestAttempts.belongsTo(Users)

Tests.hasMany(TestAttempts)
TestAttempts.belongsTo(Tests)

TestAttempts.hasMany(Responses)
Responses.belongsTo(TestAttempts)

Questions.hasMany(Responses)
Responses.belongsTo(Questions)

Answers.hasMany(Responses)
Responses.belongsTo(Answers)

module.exports = {
    Answers,
    Questions,
    Responses,
    Settings,
    TestAttempts,
    Tests,
    Users
}





