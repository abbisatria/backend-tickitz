const routes = require('express').Router()
const transactionControllers = require('../controllers/transaction')
const authMiddleware = require('../middlewares/auth')

routes.post('/', authMiddleware.authCheck, transactionControllers.createTransaction)
routes.get('/:idUser', authMiddleware.authCheck, transactionControllers.detailTransaction)

module.exports = routes
