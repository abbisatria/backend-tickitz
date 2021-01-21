const { APP_URL } = process.env
const movieModel = require('../models/movies')
const genreModel = require('../models/genre')
const movieGenreModel = require('../models/movieGenres')
const validation = require('../helpers/validation')
const fs = require('fs')

exports.listMovies = async (req, res) => {
  try {
    const cond = req.query
    cond.search = cond.search || ''
    cond.page = Number(cond.page) || 1
    cond.limit = Number(cond.limit) || 5
    cond.dataLimit = cond.limit
    cond.offset = (cond.page * cond.limit) - cond.limit
    cond.sort = cond.sort || 'id'
    cond.order = cond.order || 'ASC'

    const results = await movieModel.getMoviesByCondition(cond)

    const totalData = await movieModel.getCountMovies()

    const totalPage = Math.ceil(Number(totalData) / cond.limit)
    return res.status(200).json({
      success: true,
      message: 'List of all Movies',
      results,
      pageInfo: {
        totalData: results.length,
        currentPage: cond.page,
        totalPage,
        nextLink: cond.page < totalPage ? `${APP_URL}movies?page=${cond.page + 1}` : null,
        prevLink: cond.page > 1 ? `${APP_URL}movies?page=${cond.page - 1}` : null
      }
    })
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'Bad Request'
    })
  }
}

exports.createMovies = async (req, res) => {
  const valid = validation.validationMovie(req.body)

  if (valid.error) {
    return res.status(400).json({
      success: false,
      message: valid.error.details[0].message
    })
  }

  try {
    const { name, releaseDate, directed, duration, casts, description } = req.body
    const data = {
      name,
      image: req.file === undefined ? null : req.file.filename,
      releaseDate,
      directed,
      duration,
      casts,
      description
    }
    const { idGenre } = req.body
    const selectedGenre = []
    if (typeof idGenre === 'object') {
      const results = await genreModel.checkGenres(idGenre)
      console.log(results)
      if (results.length !== idGenre.length) {
        return res.status(404).json({
          success: false,
          message: 'Some genre are unavailable'
        })
      } else {
        results.forEach(item => {
          selectedGenre.push(item.id)
        })
      }
    } else if (typeof idGenre === 'string') {
      const results = await genreModel.checkGenres([idGenre])
      if (results.length !== idGenre.length) {
        return res.status(404).json({
          success: false,
          message: 'Some genre are unavailable'
        })
      } else {
        results.forEach(item => {
          selectedGenre.push(item.id)
        })
      }
    }
    const initialResult = await movieModel.createMovies(data)
    if (initialResult.affectedRows > 0) {
      if (selectedGenre.length > 0) {
        await movieModel.createMoviesGenre(initialResult.insertId, selectedGenre)
      }
      const finalResult = await movieModel.getMovieById(initialResult.insertId)
      if (finalResult.length > 0) {
        return res.json({
          success: true,
          message: 'Movie successfully created',
          results: finalResult[0]
        })
      }
      return res.status(400).json({
        success: false,
        message: 'Failed to create Movie'
      })
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'Bad Request'
    })
  }
}

exports.detailMovies = async (req, res) => {
  try {
    const { id } = req.params
    const results = await movieModel.getMovieById(id)
    if (results.length > 0) {
      return res.json({
        success: true,
        message: 'Details of Movie',
        results: results[0]
      })
    }
    return res.status(404).json({
      success: false,
      message: `Movies id ${id} not exists`
    })
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'Bad Request'
    })
  }
}

exports.deleteMovie = async (req, res) => {
  try {
    const { id } = req.params
    const initialResult = await movieModel.getMovieById(id)
    if (initialResult.length > 0) {
      if (initialResult[0].image) {
        fs.unlink(`./uploads/movies/${initialResult[0].image}`,
          function (err) {
            if (err) {
              console.log('image')
            }
            console.log('Image Update Old File deleted!')
          }
        )
      }
      const results = await movieModel.deleteMovieById(id)
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

exports.updateMovie = async (req, res) => {
  try {
    const { id } = req.params
    const { name, releaseDate, directed, duration, casts, description } = req.body
    const data = {
      name,
      image: req.file === undefined ? null : req.file.filename,
      releaseDate,
      directed,
      duration,
      casts,
      description
    }
    const { idGenre } = req.body
    const selectedGenre = []
    if (typeof idGenre === 'object') {
      const results = await genreModel.checkGenres(idGenre)
      if (results.length !== idGenre.length) {
        return res.status(404).json({
          success: false,
          message: 'Some genre are unavailable'
        })
      } else {
        results.forEach(item => {
          selectedGenre.push(item.id)
        })
      }
    } else if (typeof idGenre === 'string') {
      const results = await genreModel.checkGenres([idGenre])
      if (results.length !== idGenre.length) {
        return res.status(404).json({
          success: false,
          message: 'Some genre are unavailable'
        })
      } else {
        results.forEach(item => {
          selectedGenre.push(item.id)
        })
      }
    }
    const initialResult = await movieModel.getMovieById(id)
    if (initialResult.length > 0) {
      if (data.image) {
        fs.unlink(`./uploads/movies/${initialResult[0].image}`,
          function (err) {
            if (err) {
              console.log('image')
            }
            console.log('Image Update Old File deleted!')
          }
        )
      }
      const finalResult = await movieModel.getMovieGenreById(id)
      console.log(selectedGenre.length === finalResult.length)
      const idMovieGenre = finalResult.map((item) => item.id)
      if ((finalResult.length === selectedGenre.length)) {
        for (let i = 0; i < idMovieGenre.length; i++) {
          await movieModel.updateMoviesGenre(idMovieGenre[i], selectedGenre[i])
          console.log(selectedGenre)
        }
        await movieModel.updateMovie(id, data)
        return res.json({
          success: true,
          message: 'Update data success',
          results: {
            ...initialResult[0],
            ...data
          }
        })
      } else if (selectedGenre.length > finalResult.length) {
        for (let i = 0; i < idMovieGenre.length; i++) {
          await movieModel.updateMoviesGenre(idMovieGenre[i], selectedGenre[i])
        }
        for (let i = selectedGenre.length; i > idMovieGenre.length; i--) {
          await movieModel.createMoviesGenre(id, [selectedGenre[i - 1]])
        }
        await movieModel.updateMovie(id, data)
        return res.json({
          success: true,
          message: 'Update data success',
          results: {
            ...initialResult[0],
            ...data
          }
        })
      } else if (selectedGenre.length < finalResult.length) {
        for (let i = 0; i < selectedGenre.length; i++) {
          await movieModel.updateMoviesGenre(idMovieGenre[i], selectedGenre[i])
        }
        for (let i = finalResult.length; i > selectedGenre.length; i--) {
          await movieGenreModel.deleteMovieGenreById(idMovieGenre[i - 1])
        }
        await movieModel.updateMovie(id, data)
        return res.json({
          success: true,
          message: 'Update data success',
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
