const { APP_URL } = process.env
const cinemaModel = require('../models/cinemas')
const validation = require('../helpers/validation')
const response = require('../helpers/response')
const fs = require('fs')
const qs = require('querystring')

exports.listCinemas = async (req, res) => {
  try {
    const cond = req.query
    cond.search = cond.search || ''
    cond.page = Number(cond.page) || 1
    cond.limit = Number(cond.limit) || 5
    cond.offset = (cond.page - 1) * cond.limit
    cond.sort = cond.sort || 'id'
    cond.order = cond.order || 'ASC'

    const results = await cinemaModel.getCinamesByCondition(cond)
    let totalPage
    let totalData

    if (cond.search) {
      totalData = await cinemaModel.getCountCinemaCondition(cond)
      totalPage = Math.ceil(Number(totalData.length) / cond.limit)
    } else {
      totalData = await cinemaModel.getCountCinemas()
      totalPage = Math.ceil(Number(totalData) / cond.limit)
    }

    return response(
      res,
      200,
      true,
      'List of all Cinemas',
      results,
      {
        totalData: results.length,
        currentPage: cond.page,
        totalPage,
        nextLink: cond.page < totalPage ? `${APP_URL}cinemas?${qs.stringify({ ...req.query, ...{ page: cond.page + 1 } })}` : null,
        prevLink: cond.page > 1 ? `${APP_URL}cinemas?${qs.stringify({ ...req.query, ...{ page: cond.page - 1 } })}` : null
      }
    )
  } catch (error) {
    return response(res, 400, false, 'Bad Request')
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
    const cinemaData = {
      name: data.name,
      image: req.file === undefined ? null : req.file.filename,
      location: data.location,
      address: data.address,
      price: data.price
    }
    const results = await cinemaModel.createCinemas(cinemaData)
    if (results.affectedRows > 0) {
      const finalResult = await cinemaModel.getCinemaById(results.insertId)
      if (finalResult.length > 0) {
        return response(res, 200, true, 'Create data success', finalResult[0])
      }
      return response(res, 400, false, 'Failed to create cinema')
    }
  } catch (error) {
    return response(res, 400, false, 'Bad Request')
  }
}

exports.detailCinemas = async (req, res) => {
  try {
    const { id } = req.params
    const results = await cinemaModel.getCinemaById(id)
    if (results.length > 0) {
      return response(res, 200, true, 'Details of Cinema', results[0])
    }
    return response(res, 404, false, `Cinemas id ${id} not exists`)
  } catch (error) {
    return response(res, 400, false, 'Bad Request')
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
        return response(res, 200, true, `Cinema id ${id} deleted successfully`, initialResult[0])
      }
    }
    return response(res, 400, false, `Failed to delete cinema id ${id}`)
  } catch (error) {
    return response(res, 400, false, 'Bad Request')
  }
}

exports.updateCinema = async (req, res) => {
  try {
    const { id } = req.params
    const data = req.body
    const initialResult = await cinemaModel.getCinemaById(id)
    const cinemaData = {
      name: data.name === undefined ? initialResult[0].name : data.name,
      image: req.file === undefined ? initialResult[0].image : req.file.filename,
      location: data.location === undefined ? initialResult[0].location : data.location,
      address: data.address === undefined ? initialResult[0].address : data.address,
      price: data.price === undefined ? initialResult[0].price : data.price
    }
    console.log(cinemaData)
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
      await cinemaModel.updateCinema(id, cinemaData)
      return response(res, 200, true, `Cinema id ${id} updated successfully`, { ...initialResult[0], ...cinemaData })
    } else {
      return response(res, 400, false, `Failed to update cinema id ${id}`)
    }
  } catch (error) {
    return response(res, 400, false, 'Bad Request')
  }
}

exports.listLocation = async (req, res) => {
  try {
    const results = await cinemaModel.getlocation()
    if (results.length > 0) {
      const mapResults = results.map(item => item.location)
      const finalResults = [...new Set(mapResults)]
      return response(res, 200, true, 'List of Location', finalResults)
    }
    return response(res, 404, false, 'Location Not Found')
  } catch (error) {
    return response(res, 400, false, 'Bad Request')
  }
}

exports.getCinemaByLocation = async (req, res) => {
  try {
    const { location } = req.body
    const results = await cinemaModel.getCinemaLocation(location)
    console.log(results)
    if (results.length > 0) {
      return response(res, 200, true, 'List of Location', results)
    }
    return response(res, 404, false, 'Cinema Location Not Found')
  } catch (error) {
    return response(res, 400, false, 'Bad Request')
  }
}
