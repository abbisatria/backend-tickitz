const routes = require('express').Router()
const showtimeControllers = require('../controllers/showtimes')
const authMiddleware = require('../middlewares/auth')

routes.post('/', authMiddleware.authCheck, authMiddleware.isAdmin, showtimeControllers.createShowtime)
routes.get('/:id', showtimeControllers.detailShowtime)
routes.get('/showtime/:id', showtimeControllers.listShowtimeByMovie)
routes.patch('/:id', authMiddleware.authCheck, authMiddleware.isAdmin, showtimeControllers.updateShowtime)
routes.delete('/:id', authMiddleware.authCheck, authMiddleware.isAdmin, showtimeControllers.deleteShowtime)
routes.post('/searchLocation', showtimeControllers.listCinemaShowtime)

module.exports = routes
