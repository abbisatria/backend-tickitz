const db = require('../helpers/db')

exports.createMoviesGenre = (id, genre) => {
  return new Promise((resolve, reject) => {
    db.query(`
    INSERT INTO movie_genre 
    (idMovie, idGenre) 
    VALUES ${genre.map(item => `(${id}, ${item})`).join()}`, (err, res, field) => {
      if (err) reject(err)
      resolve(res)
    })
  })
}

exports.getMovieGenreById = (id) => {
  return new Promise((resolve, reject) => {
    db.query(`
      SELECT id FROM movie_genre WHERE idMovie=${id}
    `, (err, res, field) => {
      if (err) reject(err)
      resolve(res)
    })
  })
}

exports.deleteMovieGenreById = (id) => {
  return new Promise((resolve, reject) => {
    const query = db.query(`
  DELETE FROM movie_genre WHERE id IN (${id.map(item => `${item}`).join()})
`, (err, res, field) => {
      if (err) reject(err)
      resolve(res)
    })
    console.log(query.sql)
  })
}

exports.updateMoviesGenre = (id, genre) => {
  return new Promise((resolve, reject) => {
    const query = db.query(`
    UPDATE movie_genre 
    SET idGenre=${genre}
    WHERE id=${id}`, (err, res, field) => {
      if (err) reject(err)
      resolve(res)
    })
    console.log(query.sql)
  })
}
