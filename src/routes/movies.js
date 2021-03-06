const routes = require('express').Router()
const movieControllers = require('../controllers/movies')
const upload = require('../helpers/upload')
const authMiddleware = require('../middlewares/auth')

routes.get('/', movieControllers.listMovies)
routes.get('/listAllMovie', movieControllers.listAllMovies)
routes.get('/movieNowShowing', movieControllers.getMovieNowShowing)
routes.get('/upComing', movieControllers.getMovieMonth)
routes.get('/:id', movieControllers.detailMovies)
routes.get('/detailGenre/:id', movieControllers.detailMovieGenre)
routes.post('/', authMiddleware.authCheck, authMiddleware.isAdmin, upload, movieControllers.createMovies)
routes.delete('/:id', authMiddleware.authCheck, authMiddleware.isAdmin, movieControllers.deleteMovie)
routes.patch('/:id', authMiddleware.authCheck, authMiddleware.isAdmin, upload, movieControllers.updateMovie)

module.exports = routes
