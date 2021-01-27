const db = require('../helpers/db')

exports.createCinemaShowtimes = (idCinema, idMovie, showtime) => {
  return new Promise((resolve, reject) => {
    const query = db.query(`
    INSERT INTO showtimes
    (idCinema, idMovie, showtime) 
    VALUES ${showtime.map(item => `(${idCinema}, ${idMovie}, '${item}')`).join()}`, (err, res, field) => {
      if (err) reject(err)
      resolve(res)
    })
    console.log(query.sql)
  })
}

exports.getShowtimeWithCinemaAndMovie = (id) => {
  return new Promise((resolve, reject) => {
    const query = db.query(`
    SELECT s.id, m.name AS movie, c.name AS cinema, s.showtime 
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

exports.getShowtime = () => {
  return new Promise((resolve, reject) => {
    db.query(`
    SELECT * FROM showtimes
    `, (err, res, field) => {
      if (err) reject(err)
      resolve(res)
    })
  })
}

exports.getCinema = () => {
  return new Promise((resolve, reject) => {
    db.query(`
    SELECT * FROM cinemas
    `, (err, res, field) => {
      if (err) reject(err)
      resolve(res)
    })
  })
}

exports.getLocationCinema = (cond) => {
  return new Promise((resolve, reject) => {
    const query = db.query(`
    SELECT location FROM cinemas
    WHERE location LIKE "%${cond}%"
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
      SET ${key.map((item, index) => `${item}=${value[index]}`)}
      WHERE idMovie=${id}
    `, (err, res, field) => {
      if (err) reject(err)
      resolve(res)
    })
    console.log(query.db)
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
