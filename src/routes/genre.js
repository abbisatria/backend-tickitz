const routes = require('express').Router()
const genreControllers = require('../controllers/genre')
const authMiddleware = require('../middlewares/auth')

routes.get('/', genreControllers.listGenre)
routes.get('/listAllGenre', genreControllers.listAllGenre)
routes.get('/:id', genreControllers.detailGenre)
routes.post('/', authMiddleware.authCheck, authMiddleware.isAdmin, genreControllers.createGenre)
routes.delete('/:id', authMiddleware.authCheck, authMiddleware.isAdmin, genreControllers.deleteGenre)
routes.patch('/:id', authMiddleware.authCheck, authMiddleware.isAdmin, genreControllers.updateGenre)

module.exports = routes
