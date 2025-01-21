const { Responses } = require('../models/index')
const ApiError = require("../errors/ApiError")

class ResponseController {
    async create(req, res, next) {
        try {
            let {openResponse, testAttemptId, questionId, answerId} = req.body 
            const response = await Responses.create({openResponse, testAttemptId, questionId, answerId})
            
            return res.json(response)
        }
        catch(err) {
            return next(ApiError.badRequest(err))
        }
    }

    async getAll(req, res, next){
        try {
            let {testAttemptId} = req.query 
            let response

            if(!testAttemptId) {
                response = await Responses.findAndCountAll({order: [['createdAt', 'ASC']]})
            }
            if(testAttemptId) {
                response = await Responses.findAndCountAll({where: {testAttemptId}, order: [['createdAt', 'ASC']]})
            }

            return res.json(response)
        }
        catch(err) {
            return next(ApiError.badRequest(err))
        }
    }

    async getOne(req, res, next){
        try {
            let {id} = req.params 

            const response = await Responses.findByPk(id)

            return res.json(response)
        }
        catch(err) {
            return next(ApiError.badRequest(err))
        }
    }

    // async update(req, res, next) {
    //     try {
    //         const {id} = req.params

    //         const question = await Questions.findByPk(id)
            
    //         if(!question) {
    //             return next(ApiError.badRequest("Question not Found"))
    //         }
            
    //         const {questionText, type} = req.body

    //         question.questionText = questionText || question.questionText
    //         question.type = type || question.type

    //         await question.save()

    //         return res.json(question) 
    //     }
    //     catch(err) {
    //         return next(ApiError.badRequest(err))
    //     }
    // } 

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

module.exports = new ResponseController()