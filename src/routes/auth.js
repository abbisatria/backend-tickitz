const routes = require('express').Router()
const authController = require('../controllers/auth')

routes.post('/register', authController.register)
routes.post('/login', authController.login)
routes.post('/forgotPassword', authController.forgotPassword)
routes.get('/verification/:id', authController.verificationEmail)
routes.patch('/resetPassword/:id', authController.resetPassword)

module.exports = routes
