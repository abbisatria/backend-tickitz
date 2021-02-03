const routes = require('express').Router()
const movieControllers = require('../controllers/movies')
const upload = require('../helpers/upload')
const authMiddleware = require('../middlewares/auth')

routes.get('/', movieControllers.listMovies)
routes.get('/movieNowShowing', movieControllers.getMovieNowShowing)
routes.get('/movieMonth', movieControllers.getMovieMonth)
routes.get('/:id', movieControllers.detailMovies)
routes.post('/', authMiddleware.authCheck, authMiddleware.isAdmin, upload, movieControllers.createMovies)
routes.delete('/:id', authMiddleware.authCheck, authMiddleware.isAdmin, movieControllers.deleteMovie)
routes.patch('/:id', authMiddleware.authCheck, authMiddleware.isAdmin, upload, movieControllers.updateMovie)

module.exports = routes
