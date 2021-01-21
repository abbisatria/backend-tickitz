const routes = require('express').Router()
const movieControllers = require('../controllers/movies')
const upload = require('../helpers/upload')

routes.get('/', movieControllers.listMovies)
routes.get('/:id', movieControllers.detailMovies)
routes.post('/', upload, movieControllers.createMovies)
routes.delete('/:id', movieControllers.deleteMovie)
routes.patch('/:id', upload, movieControllers.updateMovie)

module.exports = routes
