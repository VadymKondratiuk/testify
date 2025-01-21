const Tests = require('../models/tests')
const Questions = require('../models/questions')
const Answers = require('../models/answers')
const ApiError = require('../errors/ApiError')

let getTestId = async() => {
    if(mode === "test") {
        return req.params.id
    }
    if(mode === "question") {
        const question = await Questions.findByPk(req.params.id)
        if(!question) next(ApiError.badRequest("Question not found!"))

        return question.testId
    }
    if(mode === "answer") {
        const answer = await Answers.findByPk(req.params.id)
        if(!answer) next(ApiError.badRequest("Answer not found!"))

        const question = await Questions.findByPk(answer.questionId)
        if(!question) next(ApiError.badRequest("Question not found!"))

        return question.testId
    }
}

module.exports = (mode) =>{
    return async (req, res, next) => {
        try {
            const test = await Tests.findByPk(await getTestId())

            if(!test) {
                return next(ApiError.badRequest('Test do not exist'))
            }

            if(req.user.id !== test.userId) {
                return next(ApiError.noAccess())
            }

            next()
        }
        catch(err) {
            return next(ApiError.badRequest(err))
        }
    }
}
    