const Router = require('express')
const router = new Router()
const testAttemptController = require('../controllers/testAttemptController')
const authMiddleware = require('../middleware/authMiddleware')
const creatorMiddleware = require('../middleware/creatorMiddleware') //add creator middleware in methods

router.post('/', authMiddleware, testAttemptController.create)
router.get('/', testAttemptController.getAll)
router.get('/:id', testAttemptController.getOne)
router.put('/:id', authMiddleware, testAttemptController.update)
// router.delete('/:id', authMiddleware, questionController.delete)

module.exports = router