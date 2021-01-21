const routes = require('express').Router()
const cinemaControllers = require('../controllers/cinemas')
const upload = require('../helpers/uploadCinemas')

routes.get('/', cinemaControllers.listCinemas)
routes.get('/:id', cinemaControllers.detailCinemas)
routes.post('/', upload, cinemaControllers.createCinemas)
routes.delete('/:id', cinemaControllers.deleteCinema)
routes.patch('/:id', upload, cinemaControllers.updateCinema)

module.exports = routes
