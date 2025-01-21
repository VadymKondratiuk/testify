const Router = require('express')
const router = new Router()
const answerController = require('../controllers/answerController')
const authMiddleware = require('../middleware/authMiddleware')
const creatorMiddleware = require('../middleware/creatorMiddleware') //add in methods

router.post('/', authMiddleware,answerController.create)
router.get('/', answerController.getAll)
router.get('/:id', answerController.getOne)
router.put('/:id', authMiddleware, answerController.update)
router.delete('/:id', authMiddleware, answerController.delete)


module.exports = router