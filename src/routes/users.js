const routes = require('express').Router()
const userControllers = require('../controllers/users')
const upload = require('../helpers/uploadUsers')
const authMiddleware = require('../middlewares/auth')

routes.get('/:id', authMiddleware.authCheck, userControllers.detailUserProfile)
routes.patch('/updateProfile/:id', authMiddleware.authCheck, upload, userControllers.updateUserProfile)

module.exports = routes
