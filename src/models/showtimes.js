const db = require('../helpers/db')

exports.createCinemaShowtimes = (idCinema, idMovie, showtime, showtimeDate) => {
  return new Promise((resolve, reject) => {
    const query = db.query(`
    INSERT INTO showtimes
    (idCinema, idMovie, showtime, showtimeDate) 
    VALUES ${showtime.map(item => `(${idCinema}, ${idMovie}, '${item}', '${showtimeDate}')`).join()}`, (err, res, field) => {
      if (err) reject(err)
      resolve(res)
    })
    console.log(query.sql)
  })
}

exports.getShowtimeWithCinemaAndMovie = (id) => {
  return new Promise((resolve, reject) => {
    const query = db.query(`
    SELECT s.id, m.name AS movie, c.name AS cinema, s.showtime, s.showtimeDate 
    FROM showtimes s 
    INNER JOIN cinemas c on c.id = s.idCinema 
    INNER JOIN movies m on m.id = s.idMovie 
    WHERE s.idMovie=${id}
    `, (err, res, field) => {
      if (err) reject(err)
      resolve(res)
    })
    console.log(query.sql)
  })
}

exports.getCinemaShowtimeById = (id) => {
  return new Promise((resolve, reject) => {
    const query = db.query(`
    SELECT id FROM showtimes WHERE idMovie=${id}
    `, (err, res, field) => {
      if (err) reject(err)
      resolve(res)
    })
    console.log(query.sql)
  })
}

exports.getShowtimesById = (id) => {
  return new Promise((resolve, reject) => {
    db.query(`
      SELECT * FROM showtimes WHERE id=${id}
    `, (err, res, field) => {
      if (err) reject(err)
      resolve(res)
    })
  })
}

exports.getShowtime = (id) => {
  return new Promise((resolve, reject) => {
    const query = db.query(`
    SELECT * FROM showtimes
    WHERE id IN (${id.map(item => `${item}`).join()})
    `, (err, res, field) => {
      if (err) reject(err)
      resolve(res)
    })
    console.log(query.sql)
  })
}

exports.getCinema = (id) => {
  return new Promise((resolve, reject) => {
    const query = db.query(`
    SELECT * FROM cinemas
    WHERE id IN (${id.map(item => `${item}`).join()})
    `, (err, res, field) => {
      if (err) reject(err)
      resolve(res)
    })
    console.log(query.sql)
  })
}

exports.getLocationCinema = (location, date, idMovie) => {
  return new Promise((resolve, reject) => {
    const query = db.query(`
    SELECT c.location, s.showtimeDate, s.idMovie, s.idCinema, s.id AS idShowtime FROM cinemas c 
    INNER JOIN showtimes s ON s.idCinema = c.id 
    WHERE c.location LIKE "%${location}%" AND s.showtimeDate LIKE "%${date}%" AND s.idMovie LIKE "%${idMovie}%"
    `, (err, res, field) => {
      if (err) reject(err)
      resolve(res)
    })
    console.log(query.sql)
  })
}

exports.updateCinemaShowtime = (id, showtime) => {
  return new Promise((resolve, reject) => {
    const query = db.query(`
    UPDATE showtimes 
    SET showtime='${showtime}'
    WHERE id=${id}`, (err, res, field) => {
      if (err) reject(err)
      resolve(res)
    })
    console.log(query.sql)
  })
}

exports.updateShowtime = (id, data) => {
  return new Promise((resolve, reject) => {
    const key = Object.keys(data)
    const value = Object.values(data)
    const query = db.query(`
      UPDATE showtimes
      SET ${key.map((item, index) => `${item}='${value[index]}'`)}
      WHERE idMovie=${id}
    `, (err, res, field) => {
      if (err) reject(err)
      resolve(res)
    })
    console.log(query.sql)
  })
}

exports.deleteCinemaShowtimeById = (id) => {
  return new Promise((resolve, reject) => {
    const query = db.query(`
  DELETE FROM showtimes WHERE id IN (${id.map(item => `${item}`).join()})
`, (err, res, field) => {
      if (err) reject(err)
      resolve(res)
    })
    console.log(query.sql)
  })
}

exports.deleteShowtimeById = (id) => {
  return new Promise((resolve, reject) => {
    const query = db.query(`
  DELETE FROM showtimes WHERE id=${id}
`, (err, res, field) => {
      if (err) reject(err)
      resolve(res)
    })
    console.log(query.sql)
  })
}
