const Router = require('express')
const router = new Router()
const testController = require('../controllers/testController')
const authMiddleware = require('../middleware/authMiddleware')
const creatorMiddleware = require('../middleware/creatorMiddleware') //add in methods

router.post('/', authMiddleware, testController.create)
router.get('/', testController.getAll)
router.get('/:id', testController.getOne)
router.put('/:id', authMiddleware, testController.update)
router.delete('/:id', authMiddleware, testController.delete)

module.exports = router