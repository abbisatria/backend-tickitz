const db = require('../helpers/db')

exports.getCinamesByCondition = (cond) => {
  return new Promise((resolve, reject) => {
    db.query(`
    SELECT * FROM
    cinemas WHERE name LIKE "%${cond.search}%"
    ORDER BY ${cond.sort} ${cond.order}
    LIMIT ${cond.dataLimit} OFFSET ${cond.offset}
    `, (err, res, field) => {
      if (err) reject(err)
      resolve(res)
    })
  })
}

exports.getCountCinemas = () => {
  return new Promise((resolve, reject) => {
    db.query('SELECT COUNT(*) as total_cinemas FROM cinemas', (err, res, field) => {
      if (err) reject(err)
      resolve(res[0].total_cinemas)
    })
  })
}

exports.createCinemas = (data = {}) => {
  return new Promise((resolve, reject) => {
    db.query(`
    INSERT INTO cinemas
    (${Object.keys(data).join()})
    VALUES
    (${Object.values(data).map(item => `"${item}"`).join(',')})
    `, (err, res, field) => {
      if (err) reject(err)
      resolve(res)
    })
  })
}

exports.createCinemaShowtimes = (id, showtime) => {
  return new Promise((resolve, reject) => {
    const query = db.query(`
    INSERT INTO showtimes
    (idCinema, showtime) 
    VALUES ${showtime.map(item => `(${id}, '${item}')`).join()}`, (err, res, field) => {
      if (err) reject(err)
      resolve(res)
    })
    console.log(query.sql)
  })
}

exports.getCinemaById = (id) => {
  return new Promise((resolve, reject) => {
    db.query(`
      SELECT * FROM cinemas WHERE id=${id}
    `, (err, res, field) => {
      if (err) reject(err)
      resolve(res)
    })
  })
}

exports.getCinemaWithShowtimeById = (id) => {
  return new Promise((resolve, reject) => {
    const query = db.query(`
    SELECT c.*, s.showtime AS showtimes FROM cinemas c LEFT JOIN showtimes s on s.idCinema = c.id WHERE c.id=${id}
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
    SELECT id FROM showtimes WHERE idCinema=${id}
    `, (err, res, field) => {
      if (err) reject(err)
      resolve(res)
    })
    console.log(query.sql)
  })
}

exports.deleteCinemaById = (id) => {
  return new Promise((resolve, reject) => {
    const query = db.query(`
  DELETE FROM cinemas WHERE id=${id}
`, (err, res, field) => {
      if (err) reject(err)
      resolve(res)
    })
    console.log(query.sql)
  })
}

exports.updateCinema = (id, data) => {
  return new Promise((resolve, reject) => {
    const key = Object.keys(data)
    const value = Object.values(data)
    const query = db.query(`
      UPDATE cinemas
      SET ${key.map((item, index) => `${item}="${value[index]}"`)}
      WHERE id=${id}
    `, (err, res, field) => {
      if (err) reject(err)
      resolve(res)
    })
    console.log(query.db)
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
