const { APP_URL } = process.env
const genreModel = require('../models/genre')
const validation = require('../helpers/validation')
const response = require('../helpers/response')
const qs = require('querystring')

exports.listGenre = async (req, res) => {
  try {
    const cond = req.query
    cond.search = cond.search || ''
    cond.page = Number(cond.page) || 1
    cond.limit = Number(cond.limit) || 5
    cond.offset = (cond.page * cond.limit) - cond.limit
    cond.sort = cond.sort || 'id'
    cond.order = cond.order || 'ASC'

    const results = await genreModel.getGenreByCondition(cond)

    let totalPage
    let totalData

    if (cond.search) {
      totalData = await genreModel.getCountGenreCondition(cond)
      totalPage = Math.ceil(Number(totalData.length) / cond.limit)
    } else {
      totalData = await genreModel.getCountGenre()
      totalPage = Math.ceil(Number(totalData) / cond.limit)
    }

    return response(
      res,
      200,
      true,
      'List of all Genre',
      results,
      {
        totalData: results.length,
        currentPage: cond.page,
        totalPage,
        nextLink: cond.page < totalPage ? `${APP_URL}genre?${qs.stringify({ ...req.query, ...{ page: cond.page + 1 } })}` : null,
        prevLink: cond.page > 1 ? `${APP_URL}genre?${qs.stringify({ ...req.query, ...{ page: cond.page - 1 } })}` : null
      }
    )
  } catch (error) {
    return response(res, 400, false, 'Bad Request')
  }
}

exports.createGenre = async (req, res) => {
  const valid = validation.validationGenre(req.body)

  if (valid.error) {
    return response(res, 400, false, valid.error.details[0].message)
  }
  try {
    const data = req.body
    const results = await genreModel.createGenre(data)
    if (results.affectedRows > 0) {
      const finalResult = await genreModel.getGenreById(results.insertId)
      if (finalResult.length > 0) {
        return response(res, 200, true, 'Create data success', finalResult[0])
      }
      return response(res, 400, false, 'Failed to create genre')
    }
  } catch (error) {
    return response(res, 400, false, 'Bad Request')
  }
}

exports.detailGenre = async (req, res) => {
  try {
    const { id } = req.params
    const results = await genreModel.getGenreById(id)
    if (results.length > 0) {
      return response(res, 200, true, 'Details of Genre', results[0])
    }
    return response(res, 404, false, `Genre id ${id} not exists`)
  } catch (error) {
    return response(res, 400, false, 'Bad Request')
  }
}

exports.deleteGenre = async (req, res) => {
  try {
    const { id } = req.params
    const initialResult = await genreModel.getGenreById(id)
    if (initialResult.length > 0) {
      const results = await genreModel.deleteGenreById(id)
      if (results) {
        return response(res, 200, true, `Genre id ${id} deleted successfully`, initialResult[0])
      }
    }
    return response(res, 400, false, `Failed to delete genre id ${id}`)
  } catch (error) {
    return response(res, 400, false, 'Bad Request')
  }
}

exports.updateGenre = async (req, res) => {
  try {
    const { id } = req.params
    const data = req.body
    const initialResult = await genreModel.getGenreById(id)
    if (initialResult.length > 0) {
      await genreModel.updateGenre(id, data)
      return response(res, 200, true, `Genre id ${id} updated successfully`, { ...initialResult[0], ...data })
    } else {
      return response(res, 200, false, `Failed to update genre id ${id}`)
    }
  } catch (error) {
    return response(res, 400, false, 'Bad Request')
  }
}
