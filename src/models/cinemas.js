const db = require('../helpers/db')

exports.getCinamesByCondition = (cond) => {
  return new Promise((resolve, reject) => {
    db.query(`
    SELECT * FROM
    cinemas WHERE name LIKE "%${cond.search}%"
    ORDER BY ${cond.sort} ${cond.order}
    LIMIT ${cond.limit} OFFSET ${cond.offset}
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

exports.getCountCinemaCondition = (cond) => {
  return new Promise((resolve, reject) => {
    const query = db.query(`SELECT COUNT(name) as totalData FROM
    cinemas WHERE name LIKE "%${cond.search}%"
    GROUP BY name
    ORDER BY ${cond.sort} ${cond.order}`, (err, res, field) => {
      if (err) reject(err)
      resolve(res)
    })
    console.log(query.sql)
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
    console.log(query.sql)
  })
}

exports.getlocation = () => {
  return new Promise((resolve, reject) => {
    db.query(`
      SELECT location FROM cinemas
    `, (err, res, field) => {
      if (err) reject(err)
      resolve(res)
    })
  })
}

exports.getCinemaLocation = (location) => {
  return new Promise((resolve, reject) => {
    const query = db.query(`
    SELECT * FROM cinemas 
    WHERE location LIKE "%${location}%"
    `, (err, res, field) => {
      if (err) reject(err)
      resolve(res)
    })
    console.log(query.sql)
  })
}
