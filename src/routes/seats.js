const routes = require('express').Router()
const seatControllers = require('../controllers/seats')

routes.get('/:id', seatControllers.listSeatSoldByShowtime)

module.exports = routes
