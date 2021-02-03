const db = require('../helpers/db')

exports.createTransaction = (data = {}) => {
  return new Promise((resolve, reject) => {
    const query = db.query(`
    INSERT INTO transactions
    (${Object.keys(data).join()})
    VALUES
    (${Object.values(data).map(item => `${item}`).join(',')})
    `, (err, res, field) => {
      if (err) reject(err)
      resolve(res)
    })
    console.log(query.sql)
  })
}

exports.createSoldSeat = (idShowtime, seat) => {
  return new Promise((resolve, reject) => {
    const query = db.query(`
    INSERT INTO seats
    (idShowtime, name) 
    VALUES ${seat.map(item => `(${idShowtime}, '${item}')`).join()}`, (err, res, field) => {
      if (err) reject(err)
      resolve(res)
    })
    console.log(query.sql)
  })
}

exports.getUserTransactionById = (id) => {
  return new Promise((resolve, reject) => {
    const query = db.query(`SELECT t.id, u.email, m.name AS movie, m.category, c.name AS cinema, c.price, s.showtime AS showtime, s.showtimeDate, t.seats, t.ticketCount, t.totalPayment FROM transactions t
    LEFT JOIN users u on u.id = t.idUser
    LEFT JOIN movies m on m.id = t.idMovie
    LEFT JOIN cinemas c on c.id = t.idCinema
    LEFT JOIN showtimes s on s.id = t.idShowtime
    WHERE t.id=${id}`, (err, res, field) => {
      if (err) reject(err)
      resolve(res)
    })
    console.log(query.sql)
  })
}

exports.getUserTransactionByIdUser = (id) => {
  return new Promise((resolve, reject) => {
    const query = db.query(`SELECT u.email, m.name AS movie, c.name AS cinema, c.image, s.showtime AS showtime, t.seats, t.ticketCount, t.totalPayment, t.createdAt FROM transactions t
    LEFT JOIN users u on u.id = t.idUser
    LEFT JOIN movies m on m.id = t.idMovie
    LEFT JOIN cinemas c on c.id = t.idCinema
    LEFT JOIN showtimes s on s.id = t.idShowtime
    WHERE t.idUser=${id}`, (err, res, field) => {
      if (err) reject(err)
      resolve(res)
    })
    console.log(query.sql)
  })
}
