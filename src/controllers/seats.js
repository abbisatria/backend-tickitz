const seatModel = require('../models/seats')
const response = require('../helpers/response')

exports.listSeatSoldByShowtime = async (req, res) => {
  try {
    const { id } = req.params
    const results = await seatModel.getSeatByIdShowtime(id)
    if (results.length > 0) {
      return response(res, 200, true, `List of Seat Sold by idShowtime ${id}`, results)
    }
    return response(res, 404, false, `Showtime id ${id} not exists`)
  } catch (error) {
    return response(res, 400, false, 'Bad Request')
  }
}
