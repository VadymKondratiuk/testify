const { TestAttempts } = require('../models/index')
const ApiError = require("../errors/ApiError")

class TestAttemptController {
    async create(req, res, next) {
        try {
            let {startTime, endTime, score, userId, testId} = req.body 
            const testAttempt = await TestAttempts.create({startTime, endTime, score, userId, testId})
            
            return res.json(testAttempt)
        }
        catch(err) {
            return next(ApiError.badRequest(err))
        }
    }

    async getAll(req, res, next){
        try {
            let {testId, userId} = req.query 
            let testAttempt

            if(!testId && !userId) {
                testAttempt = await TestAttempts.findAndCountAll({order: [['createdAt', 'DESC']]})
            }
            if(testId && !userId) {
                testAttempt = await TestAttempts.findAndCountAll({where: {testId}, order: [['createdAt', 'DESC']]})
            }
            if(!testId && userId) {
                testAttempt = await TestAttempts.findAndCountAll({where: {userId}, order: [['createdAt', 'DESC']]})
            }
            if(testId && userId) {
                testAttempt = await TestAttempts.findAndCountAll({where: {userId, testId}, order: [['createdAt', 'DESC']]})
            }

            return res.json(testAttempt)
        }
        catch(err) {
            return next(ApiError.badRequest(err))
        }
    }

    async getOne(req, res, next){
        try {
            let {id} = req.params 

            const testAttempt = await TestAttempts.findByPk(id)

            return res.json(testAttempt)
        }
        catch(err) {
            return next(ApiError.badRequest(err))
        }
    }

    async update(req, res, next) {
        try {
            const {id} = req.params

            const testAttempt = await TestAttempts.findByPk(id)
            
            if(!testAttempt) {
                return next(ApiError.badRequest("Test Attempt not Found"))
            }
            
            const {endTime, score} = req.body

            testAttempt.endTime = endTime || testAttempt.endTime
            testAttempt.score = score || testAttempt.score

            await testAttempt.save()

            return res.json(testAttempt) 
        }
        catch(err) {
            return next(ApiError.badRequest(err))
        }
    } 

    // async delete(req, res, next) {
    //     try {
    //         const {id} = req.params 
    //         const question = await Questions.findByPk(id)

    //         if(!question) {
    //             return next(ApiError.badRequest("Question not Found"))
    //         }

    //         // await Answers.destroy({ where: { questionId: question.id } })
            
    //         await question.destroy()

    //         return res.json(question)
    //     }
    //     catch(err) {
    //         return next(ApiError.badRequest(err))
    //     }
    // }
}

module.exports = new TestAttemptController()