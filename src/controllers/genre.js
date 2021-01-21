const { APP_URL } = process.env
const genreModel = require('../models/genre')
const validation = require('../helpers/validation')

exports.listGenre = async (req, res) => {
  try {
    const cond = req.query
    cond.search = cond.search || ''
    cond.page = Number(cond.page) || 1
    cond.limit = Number(cond.limit) || 5
    cond.dataLimit = cond.limit * cond.page
    cond.offset = (cond.page - 1) * cond.limit
    cond.sort = cond.sort || 'id'
    cond.order = cond.order || 'ASC'

    const totalData = await genreModel.getCountGenre()

    const totalPage = Math.ceil(Number(totalData) / cond.limit)

    const results = await genreModel.getGenreByCondition(cond)
    console.log(results.length)
    return res.status(200).json({
      success: true,
      message: 'List of all Genre',
      results,
      pageInfo: {
        totalData: results.length,
        currentPage: cond.page,
        nextLink: cond.page < totalPage ? `${APP_URL}genre?page=${cond.page + 1}` : null,
        prevLink: cond.page > 1 ? `${APP_URL}genre?page=${cond.page - 1}` : null
      }
    })
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'Bad Request'
    })
  }
}

exports.createGenre = async (req, res) => {
  const valid = validation.validationGenre(req.body)

  if (valid.error) {
    return res.status(400).json({
      success: false,
      message: valid.error.details[0].message
    })
  }
  try {
    const data = req.body
    const results = await genreModel.createGenre(data)
    if (results.affectedRows > 0) {
      const finalResult = await genreModel.getGenreById(results.insertId)
      if (finalResult.length > 0) {
        return res.json({
          success: true,
          message: 'Create data success',
          results: finalResult[0]
        })
      }
      return res.status(400).json({
        success: false,
        message: 'Failed to create genre'
      })
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'Bad Request'
    })
  }
}

exports.detailGenre = async (req, res) => {
  try {
    const { id } = req.params
    const results = await genreModel.getGenreById(id)
    if (results.length > 0) {
      return res.json({
        success: true,
        message: 'Details of Genre',
        results: results[0]
      })
    }
    return res.status(404).json({
      success: false,
      message: `Genre id ${id} not exists`
    })
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'Bad Request'
    })
  }
}

exports.deleteGenre = async (req, res) => {
  try {
    const { id } = req.params
    const initialResult = await genreModel.getGenreById(id)
    if (initialResult.length > 0) {
      const results = await genreModel.deleteGenreById(id)
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

exports.updateGenre = async (req, res) => {
  try {
    const { id } = req.params
    const data = req.body
    const initialResult = await genreModel.getGenreById(id)
    if (initialResult.length > 0) {
      await genreModel.updateGenre(id, data)
      return res.json({
        success: true,
        message: 'Update data success',
        results: {
          ...initialResult[0],
          ...data
        }
      })
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
