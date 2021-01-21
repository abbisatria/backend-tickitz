const db = require('../helpers/db')

exports.getGenreByCondition = (cond) => {
  return new Promise((resolve, reject) => {
    db.query(`
    SELECT * FROM
    genre WHERE name LIKE "%${cond.search}%"
    ORDER BY ${cond.sort} ${cond.order}
    LIMIT ${cond.dataLimit} OFFSET ${cond.offset}
    `, (err, res, field) => {
      if (err) reject(err)
      resolve(res)
    })
  })
}

exports.getCountGenre = () => {
  return new Promise((resolve, reject) => {
    db.query('SELECT COUNT(*) as total_genre FROM genre', (err, res, field) => {
      if (err) reject(err)
      resolve(res[0].total_genre)
    })
  })
}

exports.createGenre = (data = {}) => {
  return new Promise((resolve, reject) => {
    db.query(`
    INSERT INTO genre
    (${Object.keys(data).join()})
    VALUES
    (${Object.values(data).map(item => `"${item}"`).join(',')})
    `, (err, res, field) => {
      if (err) reject(err)
      resolve(res)
    })
  })
}

exports.getGenreById = (id) => {
  return new Promise((resolve, reject) => {
    db.query(`
      SELECT * FROM genre WHERE id=${id}
    `, (err, res, field) => {
      if (err) reject(err)
      resolve(res)
    })
  })
}

exports.deleteGenreById = (id) => {
  return new Promise((resolve, reject) => {
    const query = db.query(`
  DELETE FROM genre WHERE id=${id}
`, (err, res, field) => {
      if (err) reject(err)
      resolve(res)
    })
    console.log(query.sql)
  })
}

exports.updateGenre = (id, data) => {
  return new Promise((resolve, reject) => {
    const key = Object.keys(data)
    const value = Object.values(data)
    db.query(`
      UPDATE genre
      SET ${key.map((item, index) => `${item}="${value[index]}"`)}
      WHERE id=${id}
    `, (err, res, field) => {
      if (err) reject(err)
      resolve(res)
    })
  })
}

exports.checkGenres = (data = []) => {
  return new Promise((resolve, reject) => {
    db.query(`SELECT * FROM genre WHERE id IN (${data.map(item => item).join()})`, (err, res, field) => {
      if (err) reject(err)
      resolve(res)
    })
  })
}
