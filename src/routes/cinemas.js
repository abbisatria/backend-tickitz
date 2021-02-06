const routes = require('express').Router()
const cinemaControllers = require('../controllers/cinemas')
const upload = require('../helpers/uploadCinemas')
const authMiddleware = require('../middlewares/auth')

routes.get('/', cinemaControllers.listCinemas)
routes.get('/location', cinemaControllers.listLocation)
routes.get('/:id', cinemaControllers.detailCinemas)
routes.post('/cinemaLocation', cinemaControllers.getCinemaByLocation)
routes.post('/', authMiddleware.authCheck, authMiddleware.isAdmin, upload, cinemaControllers.createCinemas)
routes.delete('/:id', authMiddleware.authCheck, authMiddleware.isAdmin, cinemaControllers.deleteCinema)
routes.patch('/:id', authMiddleware.authCheck, authMiddleware.isAdmin, upload, cinemaControllers.updateCinema)

module.exports = routes
