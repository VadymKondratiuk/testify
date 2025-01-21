const Router = require('express')
const router = new Router()
const responseController = require('../controllers/responseController')
const authMiddleware = require('../middleware/authMiddleware')
const creatorMiddleware = require('../middleware/creatorMiddleware') //add creator middleware in methods

router.post('/', authMiddleware, responseController.create)
router.get('/', responseController.getAll)
router.get('/:id', responseController.getOne)

module.exports = router