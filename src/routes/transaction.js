const routes = require('express').Router()
const transactionControllers = require('../controllers/transaction')
const authMiddleware = require('../middlewares/auth')

routes.post('/', authMiddleware.authCheck, transactionControllers.createTransaction)
routes.get('/:id', authMiddleware.authCheck, transactionControllers.detailTransaction)
routes.get('/orderHistory/:idUser', authMiddleware.authCheck, transactionControllers.orderHistory)

module.exports = routes
