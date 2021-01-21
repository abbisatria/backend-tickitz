const db = require('../helpers/db')

exports.deleteMovieGenreById = (id) => {
  return new Promise((resolve, reject) => {
    const query = db.query(`
  DELETE FROM movie_genre WHERE id=${id}
`, (err, res, field) => {
      if (err) reject(err)
      resolve(res)
    })
    console.log(query.sql)
  })
}
