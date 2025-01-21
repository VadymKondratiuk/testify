const Router = require('express')
const router = new Router()

const userRouter = require('./userRouter')
const testRouter = require('./testRouter')
const questionRouter = require('./questionRouter')
const answerRouter = require('./answerRouter')
const testAttemptRouter = require('./testAttemptRouter')
const responseRouter = require('./responseRouter')

router.use('/user', userRouter)
router.use('/test', testRouter)
router.use('/question', questionRouter)
router.use('/answer', answerRouter)
router.use('/testAttempt', testAttemptRouter)
router.use('/response', responseRouter)

module.exports = router