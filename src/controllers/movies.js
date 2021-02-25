const { APP_URL } = process.env
const movieModel = require('../models/movies')
const genreModel = require('../models/genre')
const movieGenreModel = require('../models/movieGenres')
const validation = require('../helpers/validation')
const response = require('../helpers/response')
const qs = require('querystring')
const fs = require('fs')

exports.listMovies = async (req, res) => {
  try {
    const cond = req.query
    cond.search = cond.search || ''
    cond.page = Number(cond.page) || 1
    cond.limit = Number(cond.limit) || 5
    cond.offset = (cond.page * cond.limit) - cond.limit
    cond.sort = cond.sort || 'id'
    cond.order = cond.order || 'ASC'

    const results = await movieModel.getMoviesByCondition(cond)

    const totalData = await movieModel.getCountMovieCondition(cond)
    const totalPage = Math.ceil(Number(totalData[0].totalData) / cond.limit)

    return response(
      res,
      200,
      true,
      'List of all Movies',
      results,
      {
        totalData: results.length,
        currentPage: cond.page,
        totalPage,
        nextLink: cond.page < totalPage ? `${APP_URL}movies?${qs.stringify({ ...req.query, ...{ page: cond.page + 1 } })}` : null,
        prevLink: cond.page > 1 ? `${APP_URL}movies?${qs.stringify({ ...req.query, ...{ page: cond.page - 1 } })}` : null
      }
    )
  } catch (error) {
    console.log(error)
    return response(res, 400, false, 'Bad Request')
  }
}

exports.createMovies = async (req, res) => {
  const valid = validation.validationMovie(req.body)

  if (valid.error) {
    return response(res, 400, false, valid.error.details[0].message)
  }

  try {
    const { name, releaseDate, category, directed, duration, casts, description } = req.body
    const data = {
      name,
      image: req.file === undefined ? null : req.file.filename,
      releaseDate,
      category,
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
        return response(res, 400, false, 'Some genre are unavailable')
      } else {
        results.forEach(item => {
          selectedGenre.push(item.id)
        })
      }
    } else if (typeof idGenre === 'string') {
      const results = await genreModel.checkGenres([idGenre])
      if (results.length !== idGenre.length) {
        return response(res, 400, false, 'Some genre are unavailable')
      } else {
        results.forEach(item => {
          selectedGenre.push(item.id)
        })
      }
    }
    const date = new Date()
    let initialResult
    const splitReleaseDate = data.releaseDate.split('-')
    // console.log(Number(split[1]) > 4)
    if ((Number(splitReleaseDate[1])) > (date.getMonth() + 1)) {
      initialResult = await movieModel.createMovies({ ...data, status: 'upComing' })
    } else {
      initialResult = await movieModel.createMovies(data)
    }
    if (initialResult.affectedRows > 0) {
      if (selectedGenre.length > 0) {
        await movieGenreModel.createMoviesGenre(initialResult.insertId, selectedGenre)
      }
      const finalResult = await movieModel.getMovieById(initialResult.insertId)
      if (finalResult.length > 0) {
        return response(res, 200, true, 'Movie successfully created', finalResult[0])
      }
      return response(res, 400, false, 'Failed to create Movie')
    }
  } catch (error) {
    console.log(error)
    return response(res, 400, false, 'Bad Request')
  }
}

exports.detailMovies = async (req, res) => {
  try {
    const { id } = req.params
    const results = await movieModel.getMovieById(id)
    if (results.length > 0) {
      return response(res, 200, true, 'Details of Movie', results[0])
    }
    return response(res, 404, false, `Movies id ${id} not exists`)
  } catch (error) {
    return response(res, 400, false, 'Bad Request')
  }
}

exports.detailMovieGenre = async (req, res) => {
  try {
    const { id } = req.params
    const results = await movieModel.getMovieGenreById(id)
    if (results.length > 0) {
      return response(res, 200, true, 'Details of Movie Genre', results)
    }
    return response(res, 404, false, `Movies id ${id} not exists`)
  } catch (error) {
    return response(res, 400, false, 'Bad Request')
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
        return response(res, 200, true, `Movie id ${id} deleted successfully`, initialResult[0])
      }
    }
    return response(res, 400, false, `Failed to delete movie id ${id}`)
  } catch (error) {
    return response(res, 400, false, 'Bad Request')
  }
}

exports.updateMovie = async (req, res) => {
  try {
    const { id } = req.params
    const { name, releaseDate, category, directed, duration, casts, description } = req.body
    const { idGenre } = req.body
    const selectedGenre = []
    if (typeof idGenre === 'object') {
      const results = await genreModel.checkGenres(idGenre)
      if (results.length !== idGenre.length) {
        return response(res, 404, false, 'Some genre are unavailable')
      } else {
        results.forEach(item => {
          selectedGenre.push(item.id)
        })
      }
    } else if (typeof idGenre === 'string') {
      const results = await genreModel.checkGenres([idGenre])
      if (results.length !== idGenre.length) {
        return response(res, 404, false, 'Some genre are unavailable')
      } else {
        results.forEach(item => {
          selectedGenre.push(item.id)
        })
      }
    }
    const initialResult = await movieModel.getMovieById(id)
    const data = {
      name: name === undefined ? initialResult[0].name : name,
      image: req.file === undefined ? initialResult[0].image : req.file.filename,
      releaseDate: releaseDate === undefined ? initialResult[0].releaseDate : releaseDate,
      category: category === undefined ? initialResult[0].category : category,
      directed: directed === undefined ? initialResult[0].directed : directed,
      duration: duration === undefined ? initialResult[0].duration : duration,
      casts: casts === undefined ? initialResult[0].casts : casts,
      description: description === undefined ? initialResult[0].description : description
    }
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
      const finalResult = await movieGenreModel.getMovieGenreById(id)
      console.log(selectedGenre.length === finalResult.length)
      const idMovieGenre = finalResult.map((item) => item.id)
      if ((finalResult.length === selectedGenre.length)) {
        for (let i = 0; i < idMovieGenre.length; i++) {
          await movieGenreModel.updateMoviesGenre(idMovieGenre[i], selectedGenre[i])
          console.log(selectedGenre)
        }
        await movieModel.updateMovie(id, data)
        return response(res, 200, true, `Movie id ${id} updated successfully`, { ...initialResult[0], ...data })
      } else if (selectedGenre.length > finalResult.length) {
        for (let i = 0; i < idMovieGenre.length; i++) {
          await movieGenreModel.updateMoviesGenre(idMovieGenre[i], selectedGenre[i])
        }
        await movieGenreModel.createMoviesGenre(id, selectedGenre.slice(finalResult.length))
        await movieModel.updateMovie(id, data)
        return response(res, 200, true, `Movie id ${id} updated successfully`, { ...initialResult[0], ...data })
      } else if (selectedGenre.length < finalResult.length) {
        for (let i = 0; i < selectedGenre.length; i++) {
          await movieGenreModel.updateMoviesGenre(idMovieGenre[i], selectedGenre[i])
        }
        await movieGenreModel.deleteMovieGenreById(idMovieGenre.slice(selectedGenre.length))
        await movieModel.updateMovie(id, data)
        return response(res, 200, true, `Movie id ${id} updated successfully`, { ...initialResult[0], ...data })
      }
    } else {
      return response(res, 400, false, `Failed to update movie id ${id}`)
    }
  } catch (error) {
    return response(res, 400, false, 'Bad Request')
  }
}

exports.getMovieMonth = async (req, res) => {
  try {
    const cond = req.query
    cond.search = cond.search || ''
    cond.page = Number(cond.page) || 1
    cond.limit = Number(cond.limit) || 5
    cond.offset = (cond.page * cond.limit) - cond.limit
    cond.sort = cond.sort || 'id'
    cond.order = cond.order || 'ASC'

    const results = await movieModel.getMovieUpComing(cond)
    const status = 'upComing'

    const totalData = await movieModel.getCountMovieCondition(cond, status)
    const totalPage = Math.ceil(Number(totalData[0].totalData) / cond.limit)

    return response(
      res,
      200,
      true,
      'List of Up Coming Movies',
      results,
      {
        totalData: results.length,
        currentPage: cond.page,
        totalPage,
        nextLink: cond.page < totalPage ? `${APP_URL}movies/upComing?${qs.stringify({ ...req.query, ...{ page: cond.page + 1 } })}` : null,
        prevLink: cond.page > 1 ? `${APP_URL}movies/upComing?${qs.stringify({ ...req.query, ...{ page: cond.page - 1 } })}` : null
      }
    )
  } catch (error) {
    return response(res, 400, false, 'Bad Request')
  }
}

exports.getMovieNowShowing = async (req, res) => {
  try {
    const cond = req.query
    cond.search = cond.search || ''
    cond.page = Number(cond.page) || 1
    cond.limit = Number(cond.limit) || 5
    cond.offset = (cond.page * cond.limit) - cond.limit
    cond.sort = cond.sort || 'id'
    cond.order = cond.order || 'ASC'

    const results = await movieModel.getMovieShow(cond)
    const status = 'nowShowing'

    const totalData = await movieModel.getCountMovieCondition(cond, status)
    const totalPage = Math.ceil(Number(totalData[0].totalData) / cond.limit)

    return response(
      res,
      200,
      true,
      'List of Now Showing Movies',
      results,
      {
        totalData: results.length,
        currentPage: cond.page,
        totalPage,
        nextLink: cond.page < totalPage ? `${APP_URL}movies/movieNowShowing?${qs.stringify({ ...req.query, ...{ page: cond.page + 1 } })}` : null,
        prevLink: cond.page > 1 ? `${APP_URL}movies/movieNowShowing?${qs.stringify({ ...req.query, ...{ page: cond.page - 1 } })}` : null
      }
    )
  } catch (error) {
    return response(res, 400, false, 'Bad Request')
  }
}

exports.listAllMovies = async (req, res) => {
  try {
    const results = await movieModel.getAllMovie()
    console.log(results)
    if (results.length > 0) {
      return response(res, 200, true, 'List of Movie', results)
    }
    return response(res, 404, false, 'Movies not exists')
  } catch (error) {
    return response(res, 400, false, 'Bad Request')
  }
}
