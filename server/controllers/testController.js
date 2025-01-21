const { Tests } = require('../models/index')
const ApiError = require("../errors/ApiError")

class TestController {
    async create(req, res, next) {
        try {
            let {title, description, timeLimit, isRandomized} = req.body

            if(!title) {
                return next(ApiError.badRequest("Title is required"))
            }
            
            const test = await Tests.create({title, description, timeLimit, isRandomized, userId: req.user.id})

            return res.json(test)
        }
        catch(err) {
            return next(ApiError.badRequest(err))
        }
    }

    async getAll(req, res, next){
        try {
            let {userId} = req.query 
            let tests
            if(!userId) {
                tests = await Tests.findAndCountAll({order: [['createdAt', 'DESC']]})
            }
            if(userId) {
                tests = await Tests.findAndCountAll({where: {userId}, order: [['createdAt', 'DESC']]})
            }

            return res.json(tests)
        }
        catch(err) {
            return next(ApiError.badRequest(err))
        }
    }

    async getOne(req, res, next) {
        try {
            const {id} = req.params
            const test = await Tests.findByPk(id)
            
            return res.json(test)
        }
        catch(err) {
            return next(ApiError.badRequest(err))
        }
    }

    async update(req, res, next) {
        try {
            const {id} = req.params
            const test = await Tests.findByPk(id)

            const {title, description, timeLimit, isRandomized} = req.body

            test.title = title
            test.description = description
            test.timeLimit = timeLimit
            test.isRandomized = isRandomized 

            await test.save()

            return res.json(test)
        }
        catch(err) {
            return next(ApiError.badRequest(err))
        }
    }
    async delete(req, res, next) {
        try {
            const {id} = req.params
            const test = await Tests.findByPk(id)

            if (!test) {
                return next(ApiError.badRequest("Test not found"))
            }

            await test.destroy()
            
            return res.json(test)
        }
        catch(err) {
            return next(ApiError.badRequest(err))
        }
    }
}

module.exports = new TestController()