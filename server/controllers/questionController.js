const { Questions, Answers } = require('../models/index')
const ApiError = require("../errors/ApiError")

class QuestionController {
    async create(req, res, next) {
        try {
            let {questionText, questionType, testId} = req.body 
            const question = await Questions.create({questionText, questionType, testId})
            
            return res.json(question)
        }
        catch(err) {
            return next(ApiError.badRequest(err))
        }
    }

    async getAll(req, res, next){
        try {
            let {testId} = req.query 
            let questions
            if(!testId) {
                questions = await Questions.findAndCountAll({order: [['createdAt', 'DESC']]})
            }
            if(testId) {
                questions = await Questions.findAndCountAll({where: {testId}, order: [['createdAt', 'ASC']]})
            }

            return res.json(questions)
        }
        catch(err) {
            return next(ApiError.badRequest(err))
        }
    }

    async getOne(req, res, next){
        try {
            let {id} = req.params 

            const question = await Questions.findByPk(id)

            return res.json(question)
        }
        catch(err) {
            return next(ApiError.badRequest(err))
        }
    }

    async update(req, res, next) {
        try {
            const {id} = req.params

            const question = await Questions.findByPk(id)
            
            if(!question) {
                return next(ApiError.badRequest("Question not Found"))
            }
            
            const {questionText, type} = req.body

            question.questionText = questionText || question.questionText
            question.type = type || question.type

            await question.save()

            return res.json(question) 
        }
        catch(err) {
            return next(ApiError.badRequest(err))
        }
    } 

    async delete(req, res, next) {
        try {
            const {id} = req.params 
            const question = await Questions.findByPk(id)

            if(!question) {
                return next(ApiError.badRequest("Question not Found"))
            }

            // await Answers.destroy({ where: { questionId: question.id } })
            
            await question.destroy()

            return res.json(question)
        }
        catch(err) {
            return next(ApiError.badRequest(err))
        }
    }
}

module.exports = new QuestionController()