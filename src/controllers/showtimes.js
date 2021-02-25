const showtimeModel = require('../models/showtimes')
const movieModel = require('../models/movies')
const validation = require('../helpers/validation')
const response = require('../helpers/response')
const moment = require('moment')

exports.createShowtime = async (req, res) => {
  const valid = validation.validationShowtime(req.body)

  if (valid.error) {
    return res.status(400).json({
      success: false,
      message: valid.error.details[0].message
    })
  }
  try {
    const data = req.body
    const selectedShowtime = data.showtime
    const selectedCinema = data.idCinema
    const showtimeData = {
      idMovie: data.idMovie,
      showtimeDate: data.showtimeDate
    }
    if (typeof selectedCinema === 'object' && typeof selectedShowtime === 'object') {
      await showtimeModel.createCinemaShowtimes(selectedCinema, showtimeData.idMovie, selectedShowtime, showtimeData.showtimeDate)
    }
    if (typeof selectedCinema === 'object' && typeof selectedShowtime === 'string') {
      await showtimeModel.createCinemaShowtimes(selectedCinema, showtimeData.idMovie, [selectedShowtime], showtimeData.showtimeDate)
    }
    if (typeof selectedCinema === 'string' && typeof selectedShowtime === 'object') {
      await showtimeModel.createCinemaShowtimes([selectedCinema], showtimeData.idMovie, selectedShowtime, showtimeData.showtimeDate)
    }
    if (typeof selectedCinema === 'string' && typeof selectedShowtime === 'string') {
      await showtimeModel.createCinemaShowtimes([selectedCinema], showtimeData.idMovie, [selectedShowtime], showtimeData.showtimeDate)
    }
    await movieModel.updateMovie(showtimeData.idMovie, { status: 'nowShowing' })
    const finalResult = await showtimeModel.getShowtimeWithCinemaAndMovie(showtimeData.idMovie)
    if (finalResult.length > 0) {
      return response(res, 200, true, 'Create data success', {
        id: finalResult[0].id,
        movie: finalResult[0].movie,
        cinema: finalResult.map(item => item.cinema),
        showtimeDate: finalResult[0].showtimeDate,
        showtime: finalResult.map(item => item.showtime)
      })
    }
    return response(res, 400, false, 'Failed to create showtime')
  } catch (error) {
    return response(res, 400, false, 'Bad Request')
  }
}

exports.detailShowtime = async (req, res) => {
  try {
    const { id } = req.params
    const results = await showtimeModel.getShowtimesById(id)
    if (results.length > 0) {
      return response(res, 200, true, 'Details of Showtime', results)
    }
    return response(res, 404, false, `Showtime id ${id} not exists`)
  } catch (error) {
    return response(res, 400, false, 'Bad Request')
  }
}

exports.listCinemaShowtime = async (req, res) => {
  try {
    const { date, search, idMovie } = req.body
    const resultSearch = await showtimeModel.getLocationCinema(search, date, idMovie)
    if (resultSearch.length > 0) {
      console.log(resultSearch)
      const mapShowtime = resultSearch.map(item => item.idShowtime)
      const mapIdCinema = resultSearch.map(item => item.idCinema)
      const cinema = await showtimeModel.getCinema([...new Set(mapIdCinema)])
      const showtime = await showtimeModel.getShowtime(mapShowtime)
      console.log(showtime)
      const hash = Object.create(null)
      const result = cinema.map(((hash) => (cinema) => (hash[cinema.id] = { id: cinema.id, name: cinema.name, image: cinema.image, location: cinema.location, address: cinema.address, price: cinema.price, showtime: [] }))(hash))
      showtime.forEach((hash => showtime => hash[showtime.idCinema].showtime.push({ id: showtime.id, name: showtime.showtime }))(hash))

      return response(res, 200, true, 'List of Cinema Showtime', result)
    }
    return response(res, 404, false, `Location ${search}, ShowtimeDate ${date}, and idMovie ${idMovie} not exists`)
  } catch (error) {
    return response(res, 400, false, 'Bad Request')
  }
}

exports.updateShowtime = async (req, res) => {
  try {
    const { id } = req.params
    const data = req.body
    const selectedShowtime = data.showtime
    const showtimeData = {
      idCinema: data.idCinema,
      idMovie: data.idMovie,
      showtimeDate: data.showtimeDate
    }
    const initialResult = await showtimeModel.getShowtimeWithCinemaAndMovie(id)
    if (initialResult.length > 0) {
      const results = await showtimeModel.getCinemaShowtimeById(id)
      const idShowtime = results.map((item) => item.id)
      if (typeof selectedShowtime === 'object') {
        if (selectedShowtime.length === results.length) {
          for (let i = 0; i < idShowtime.length; i++) {
            await showtimeModel.updateCinemaShowtime(idShowtime[i], selectedShowtime[i])
          }
          console.log('test')
          await showtimeModel.updateShowtime(id, showtimeData)
          return response(res, 200, true, 'Updated successfully', { ...initialResult[0], ...data })
        } else if (selectedShowtime.length > results.length) {
          for (let i = 0; i < idShowtime.length; i++) {
            await showtimeModel.updateCinemaShowtime(idShowtime[i], selectedShowtime[i])
          }
          await showtimeModel.createCinemaShowtimes(showtimeData.idCinema, id, selectedShowtime.slice(results.length, selectedShowtime.length), showtimeData.showtimeDate)
          await showtimeModel.updateShowtime(id, showtimeData)
          return response(res, 200, true, 'Updated successfully', { ...initialResult[0], ...data })
        } else if (selectedShowtime.length < results.length) {
          for (let i = 0; i < selectedShowtime.length; i++) {
            await showtimeModel.updateCinemaShowtime(idShowtime[i], selectedShowtime[i])
          }
          await showtimeModel.deleteCinemaShowtimeById(idShowtime.slice(selectedShowtime.length))
          await showtimeModel.updateShowtime(id, showtimeData)
          return response(res, 200, true, 'Updated successfully', { ...initialResult[0], ...data })
        }
      }
      if (typeof selectedShowtime === 'string') {
        await showtimeModel.updateCinemaShowtime(idShowtime[0], selectedShowtime)
        await showtimeModel.deleteCinemaShowtimeById(idShowtime.slice([selectedShowtime].length))
        await showtimeModel.updateShowtime(id, showtimeData)
        return response(res, 200, true, 'Updated successfully', { ...initialResult[0], ...data })
      }
    } else {
      return response(res, 400, false, 'Failed to update showtime')
    }
  } catch (error) {
    return response(res, 400, false, 'Bad Request')
  }
}

exports.deleteShowtime = async (req, res) => {
  try {
    const { id } = req.params
    const initialResult = await showtimeModel.getShowtimesById(id)
    if (initialResult.length > 0) {
      const results = await showtimeModel.deleteShowtimeById(id)
      if (results) {
        return response(res, 200, true, `Showtime id ${id} deleted successfully`, initialResult)
      }
    }
    return response(res, 400, false, `Failed to delete showtime id ${id}`)
  } catch (error) {
    return response(res, 400, false, 'Bad Request')
  }
}

exports.listShowtimeByMovie = async (req, res) => {
  try {
    const { id } = req.params
    const results = await showtimeModel.getShowtimeByMovie(Number(id))
    if (results.length > 0) {
      const mapResults = results.map(item => moment(item.showtimeDate).format('YYYY-MM-DD'))
      const finalResults = [...new Set(mapResults)]
      return response(res, 200, true, 'List of Showtime', finalResults)
    }
    return response(res, 404, false, 'Showtime Not Found')
  } catch (error) {
    return response(res, 400, false, 'Bad Request')
  }
}
