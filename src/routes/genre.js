const routes = require('express').Router()
const genreControllers = require('../controllers/genre')

routes.get('/', genreControllers.listGenre)
routes.get('/:id', genreControllers.detailGenre)
routes.post('/', genreControllers.createGenre)
routes.delete('/:id', genreControllers.deleteGenre)
routes.patch('/:id', genreControllers.updateGenre)

module.exports = routes
