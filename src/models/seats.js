const db = require('../helpers/db')

exports.getSeatByIdShowtime = (id) => {
  return new Promise((resolve, reject) => {
    db.query(`
    SELECT name FROM seats
    WHERE idShowtime=${id}
    `, (err, res, field) => {
      if (err) reject(err)
      resolve(res)
    })
  })
}
