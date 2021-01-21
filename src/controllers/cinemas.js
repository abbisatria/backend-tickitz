const { APP_URL } = process.env
const cinemaModel = require('../models/cinemas')
const validation = require('../helpers/validation')
const fs = require('fs')

exports.listCinemas = async (req, res) => {
  try {
    const cond = req.query
    cond.search = cond.search || ''
    cond.page = Number(cond.page) || 1
    cond.limit = Number(cond.limit) || 5
    cond.dataLimit = cond.limit * cond.page
    cond.offset = (cond.page - 1) * cond.limit
    cond.sort = cond.sort || 'id'
    cond.order = cond.order || 'ASC'

    const totalData = await cinemaModel.getCountCinemas()

    const totalPage = Math.ceil(Number(totalData) / cond.limit)

    const results = await cinemaModel.getCinamesByCondition(cond)
    console.log(results.length)
    return res.status(200).json({
      success: true,
      message: 'List of all Cinemas',
      results,
      pageInfo: {
        totalData: results.length,
        currentPage: cond.page,
        nextLink: cond.page < totalPage ? `${APP_URL}cinemas?page=${cond.page + 1}` : null,
        prevLink: cond.page > 1 ? `${APP_URL}cinemas?page=${cond.page - 1}` : null
      }
    })
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'Bad Request'
    })
  }
}

exports.createCinemas = async (req, res) => {
  const valid = validation.validationCinema(req.body)

  if (valid.error) {
    return res.status(400).json({
      success: false,
      message: valid.error.details[0].message
    })
  }
  try {
    const data = req.body
    const selectedShowtime = data.showtime
    const cinemaData = {
      name: data.name,
      image: req.file === undefined ? null : req.file.filename,
      location: data.location,
      address: data.address,
      price: data.price
    }
    const results = await cinemaModel.createCinemas(cinemaData)
    if (results.affectedRows > 0) {
      if (typeof selectedShowtime === 'object') {
        await cinemaModel.createCinemaShowtimes(results.insertId, selectedShowtime)
      }
      if (typeof selectedShowtime === 'string') {
        await cinemaModel.createCinemaShowtimes(results.insertId, [selectedShowtime])
      }
      const finalResult = await cinemaModel.getCinemaWithShowtimeById(results.insertId)
      if (finalResult.length > 0) {
        return res.json({
          success: true,
          message: 'Create data success',
          results: {
            id: finalResult[0].id,
            name: finalResult[0].name,
            image: finalResult[0].image,
            location: finalResult[0].location,
            address: finalResult[0].address,
            price: finalResult[0].price,
            showtime: finalResult.map(item => item.showtimes)
          }
        })
      }
      return res.status(400).json({
        success: false,
        message: 'Failed to create cinema'
      })
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'Bad Request'
    })
  }
}

exports.detailCinemas = async (req, res) => {
  try {
    const { id } = req.params
    const results = await cinemaModel.getCinemaById(id)
    if (results.length > 0) {
      return res.json({
        success: true,
        message: 'Details of Cinema',
        results: results[0]
      })
    }
    return res.status(404).json({
      success: false,
      message: `Cinemas id ${id} not exists`
    })
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'Bad Request'
    })
  }
}

exports.deleteCinema = async (req, res) => {
  try {
    const { id } = req.params
    const initialResult = await cinemaModel.getCinemaById(id)
    if (initialResult.length > 0) {
      if (initialResult[0].image) {
        fs.unlink(`./uploads/cinemas/${initialResult[0].image}`,
          function (err) {
            if (err) {
              console.log('image')
            }
            console.log('Image Update Old File deleted!')
          }
        )
      }
      const results = await cinemaModel.deleteCinemaById(id)
      if (results) {
        return res.status(200).json({
          success: true,
          message: 'Data deleted successfully',
          results: initialResult[0]
        })
      }
    }
    return res.status(404).json({
      success: false,
      message: `Failed to delete data id ${id}`
    })
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'Bad Request'
    })
  }
}

exports.updateCinema = async (req, res) => {
  try {
    const { id } = req.params
    const data = req.body
    const cinemaData = {
      name: data.name,
      image: req.file === undefined ? null : req.file.filename,
      location: data.location,
      address: data.address,
      price: data.price
    }
    const selectedShowtime = data.showtime
    const initialResult = await cinemaModel.getCinemaWithShowtimeById(id)
    if (initialResult.length > 0) {
      if (cinemaData.image) {
        fs.unlink(`./uploads/cinemas/${initialResult[0].image}`,
          function (err) {
            if (err) {
              console.log('image')
            }
            console.log('Image Update Old File deleted!')
          }
        )
      }
      const results = await cinemaModel.getCinemaShowtimeById(id)
      const idShowtime = results.map((item) => item.id)
      if (selectedShowtime.length === results.length) {
        for (let i = 0; i < idShowtime.length; i++) {
          await cinemaModel.updateCinemaShowtime(idShowtime[i], selectedShowtime[i])
          console.log(selectedShowtime)
        }
        await cinemaModel.updateCinema(id, cinemaData)
        return res.json({
          success: true,
          message: 'Create data success',
          results: {
            ...initialResult[0],
            ...data
          }
        })
      } else if (selectedShowtime.length > results.length) {
        for (let i = 0; i < (selectedShowtime.length - idShowtime.length); i++) {
          await cinemaModel.updateCinemaShowtime(idShowtime[i], selectedShowtime[i])
          console.log(selectedShowtime)
        }
        await cinemaModel.createCinemaShowtimes(id, selectedShowtime.slice(results.length))
        await cinemaModel.updateCinema(id, cinemaData)
        return res.json({
          success: true,
          message: 'Create data success',
          results: {
            ...initialResult[0],
            ...data
          }
        })
      } else if (selectedShowtime.length < results.length) {
        for (let i = 0; i < (idShowtime.length - selectedShowtime.length); i++) {
          await cinemaModel.updateCinemaShowtime(idShowtime[i], selectedShowtime[i])
        }
        await cinemaModel.deleteCinemaShowtimeById(idShowtime.slice(selectedShowtime.length))
        await cinemaModel.updateCinema(id, cinemaData)
        return res.json({
          success: true,
          message: 'Create data success',
          results: {
            ...initialResult[0],
            ...data
          }
        })
      }
    } else {
      return res.json({
        success: false,
        message: `Failed to update data id ${id}`
      })
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'Bad Request'
    })
  }
}
