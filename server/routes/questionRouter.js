const Router = require('express')
const router = new Router()
const questionController = require('../controllers/questionController')
const authMiddleware = require('../middleware/authMiddleware')
const creatorMiddleware = require('../middleware/creatorMiddleware') //add creator middleware in methods

router.post('/', authMiddleware, questionController.create)
router.get('/', questionController.getAll)
router.get('/:id', questionController.getOne)
router.put('/:id', authMiddleware, questionController.update)
router.delete('/:id', authMiddleware, questionController.delete)

module.exports = router