const response = require('../helpers/response')
const transactionModel = require('../models/transaction')
const cinemaModel = require('../models/cinemas')

exports.createTransaction = async (req, res) => {
  try {
    const data = req.body
    if (typeof data.seat === 'object') {
      await transactionModel.createSoldSeat(data.idShowtime, data.seat)
      const seat = data.seat.map(item => item).join(', ')
      const countTicket = data.seat.join(',').split(',').length
      const checkCinema = await cinemaModel.getCinemaById(data.idCinema)
      if (checkCinema.length > 0) {
        const countTotalPayment = checkCinema[0].price * countTicket
        const results = await transactionModel.createTransaction({
          idUser: req.userData.id,
          idMovie: data.idMovie,
          idCinema: data.idCinema,
          idShowtime: data.idShowtime,
          seats: `"${seat}"`,
          ticketCount: countTicket,
          totalPayment: countTotalPayment
        })
        const finalResult = await transactionModel.getUserTransactionById(results.insertId)
        return response(res, 200, true, 'Transaction successfully created', finalResult)
      }
    } else if (typeof data.seat === 'string') {
      await transactionModel.createSoldSeat(data.idShowtime, [data.seat])
      const countTicket = [data.seat].length
      const checkCinema = await cinemaModel.getCinemaById(data.idCinema)
      if (checkCinema.length > 0) {
        const countTotalPayment = checkCinema[0].price * countTicket
        const results = await transactionModel.createTransaction({
          idUser: req.userData.id,
          idMovie: data.idMovie,
          idCinema: data.idCinema,
          idShowtime: data.idShowtime,
          seats: `"${data.seat}"`,
          ticketCount: countTicket,
          totalPayment: countTotalPayment
        })
        const finalResult = await transactionModel.getUserTransactionById(results.insertId)
        return response(res, 200, true, 'Transaction successfully created', finalResult)
      }
    }
  } catch (error) {
    return response(res, 400, false, 'Bad Request')
  }
}

exports.detailTransaction = async (req, res) => {
  try {
    const { id } = req.params
    const results = await transactionModel.getUserTransactionById(id)
    if (results.length > 0) {
      return response(res, 200, true, 'Details of Transaction', results)
    }
    return response(res, 404, false, `Transaction id ${id} not exists`)
  } catch (error) {
    return response(res, 400, false, 'Bad Request')
  }
}

exports.orderHistory = async (req, res) => {
  try {
    const { idUser } = req.params
    const results = await transactionModel.getUserTransactionByIdUser(idUser)
    if (results.length > 0) {
      return response(res, 200, true, 'Details of Order History Transaction', results)
    }
    return response(res, 404, false, `Transaction idUser ${idUser} not exists`)
  } catch (error) {
    return response(res, 400, false, 'Bad Request')
  }
}
