const { Answers } = require('../models/index')
const ApiError = require("../errors/ApiError")

class AnswerController {
    async create(req, res, next) {
        try {
            let {answerText, isCorrect, questionId} = req.body 
            const answer = await Answers.create({answerText, isCorrect, questionId})
            
            return res.json(answer)
        }
        catch(err) {
            return next(ApiError.badRequest(err))
        }
    }

    async getAll(req, res, next){
        try {
            let { questionId } = req.query  
        
            let answers

            if(!questionId) {
                answers = await Answers.findAndCountAll()
            }
            if(questionId) {
                answers = await Answers.findAndCountAll({where: {questionId}})
            }

            return res.json(answers)
        }
        catch(err) {
            return next(ApiError.badRequest(err))
        }
    }

    async getOne(req, res, next){
        try {
            let {id} = req.params 

            const answer = await Answers.findByPk(id)

            return res.json(answer)
        }
        catch(err) {
            return next(ApiError.badRequest(err))
        }
    }

    async update(req, res, next) {
        try {
            const {id} = req.params

            const answer = await Answers.findByPk(id)

            if(!answer) {
                return next(ApiError.badRequest("Answer not Found"))
            }
            
            const {answerText, isCorrect} = req.body

            answer.answerText = answerText || answer.answerText
            answer.isCorrect = isCorrect || answer.isCorrect

            await answer.save()

            return res.json(answer) 
        }
        catch(err) {
            return next(ApiError.badRequest(err))
        }
    } 

    async delete(req, res, next) {
        try {
            const {id} = req.params 
            const answer = await Answers.findByPk(id)

            if(!answer) {
                return next(ApiError.badRequest("Question not Found"))
            }

            await answer.destroy()

            return res.json(answer)
        }
        catch(err) {
            return next(ApiError.badRequest(err))
        }
    }
}

module.exports = new AnswerController()