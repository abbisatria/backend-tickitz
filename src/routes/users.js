const routes = require('express').Router()
const userControllers = require('../controllers/users')
const subscriberControllers = require('../controllers/subscribers')
const upload = require('../helpers/uploadUsers')
const authMiddleware = require('../middlewares/auth')

routes.get('/:id', authMiddleware.authCheck, userControllers.detailUserProfile)
routes.patch('/updateProfile/:id', authMiddleware.authCheck, upload, userControllers.updateUserProfile)
routes.patch('/deletePhotoProfile/:id', authMiddleware.authCheck, userControllers.deletePhotoProfile)
routes.post('/moviegoers', subscriberControllers.createSubscriber)

module.exports = routes
