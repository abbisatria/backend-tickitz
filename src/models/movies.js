const db = require('../helpers/db')

exports.getMoviesByCondition = (cond) => {
  return new Promise((resolve, reject) => {
    const query = db.query(`
    SELECT m.*, GROUP_CONCAT(DISTINCT g.name ORDER BY g.name DESC SEPARATOR ', ') AS genre 
    FROM movies m 
    LEFT JOIN movie_genre mg on m.id = mg.idMovie 
    LEFT JOIN genre g on mg.idGenre = g.id 
    WHERE m.name LIKE "%${cond.search}%" 
    GROUP BY m.id, m.name, m.image, m.releaseDate, m.category, m.directed, m.duration, m.casts, m.description, m.createdAt, m.updatedAt
    ORDER BY ${cond.sort} ${cond.order}
    LIMIT ${cond.limit} OFFSET ${cond.offset}
    `, (err, res, field) => {
      if (err) reject(err)
      resolve(res)
    })
    console.log(query.sql)
  })
}

exports.getAllMovie = () => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM movies', (err, res, field) => {
      if (err) reject(err)
      resolve(res)
    })
  })
}

exports.getCountMovieCondition = (cond, status) => {
  return new Promise((resolve, reject) => {
    const query = db.query(`SELECT COUNT(*) as totalData FROM
    movies WHERE name LIKE "%${cond.search}%" ${status ? `AND status = '${status}'` : ''}
    ORDER BY ${cond.sort} ${cond.order}`, (err, res, field) => {
      if (err) reject(err)
      resolve(res)
    })
    console.log(query.sql)
  })
}

exports.createMovies = (data = {}) => {
  return new Promise((resolve, reject) => {
    const query = db.query(`
    INSERT INTO movies
    (${Object.keys(data).join()})
    VALUES
    (${Object.values(data).map(item => `"${item}"`).join(',')})
    `, (err, res, field) => {
      if (err) reject(err)
      resolve(res)
    })
    console.log(query.sql)
  })
}

exports.getMovieById = (id) => {
  return new Promise((resolve, reject) => {
    const query = db.query(`
    SELECT m.*, GROUP_CONCAT(DISTINCT g.name ORDER BY g.name DESC SEPARATOR ', ') AS genre 
    FROM movies m 
    LEFT JOIN movie_genre mg on m.id = mg.idMovie 
    LEFT JOIN genre g on mg.idGenre = g.id 
    WHERE m.id=${id} 
    GROUP BY m.id, m.name, m.image, m.releaseDate, m.category, m.directed, m.duration, m.casts, m.description, m.createdAt, m.updatedAt
    `, (err, res, field) => {
      if (err) reject(err)
      resolve(res)
    })
    console.log(query.sql)
  })
}

exports.getMovieGenreById = (id) => {
  return new Promise((resolve, reject) => {
    const query = db.query(`
    SELECT g.id, g.name AS genre FROM movies m INNER JOIN movie_genre mg on m.id = mg.idMovie INNER JOIN genre g on mg.idGenre = g.id WHERE m.id=${id}
    `, (err, res, field) => {
      if (err) reject(err)
      resolve(res)
    })
    console.log(query.sql)
  })
}

exports.deleteMovieById = (id) => {
  return new Promise((resolve, reject) => {
    const query = db.query(`
  DELETE FROM movies WHERE id=${id}
`, (err, res, field) => {
      if (err) reject(err)
      resolve(res)
    })
    console.log(query.sql)
  })
}

exports.updateMovie = (id, data) => {
  return new Promise((resolve, reject) => {
    const key = Object.keys(data)
    const value = Object.values(data)
    db.query(`
      UPDATE movies
      SET ${key.map((item, index) => `${item}="${value[index]}"`)}
      WHERE id=${id}
    `, (err, res, field) => {
      if (err) reject(err)
      resolve(res)
    })
  })
}

exports.getMovieShow = (cond) => {
  return new Promise((resolve, reject) => {
    db.query(`
    SELECT m.*, GROUP_CONCAT(DISTINCT g.name ORDER BY g.name DESC SEPARATOR ', ') AS genre 
    FROM movies m 
    LEFT JOIN movie_genre mg on m.id = mg.idMovie 
    LEFT JOIN genre g on mg.idGenre = g.id 
    WHERE m.name LIKE "%${cond.search}%" AND m.status = 'nowShowing'
    GROUP BY m.id, m.name, m.image, m.releaseDate, m.category, m.directed, m.duration, m.casts, m.description, m.createdAt, m.updatedAt
    ORDER BY ${cond.sort} ${cond.order}
    LIMIT ${cond.limit} OFFSET ${cond.offset}
    `, (err, res, field) => {
      if (err) reject(err)
      resolve(res)
    })
  })
}

exports.getMovieShowById = (id) => {
  return new Promise((resolve, reject) => {
    const query = db.query(`
    SELECT m.*, GROUP_CONCAT(DISTINCT g.name ORDER BY g.name DESC SEPARATOR ', ') AS genre 
    FROM movies m 
    LEFT JOIN movie_genre mg on m.id = mg.idMovie 
    LEFT JOIN genre g on mg.idGenre = g.id 
    WHERE m.id IN (${id.map(item => `${item}`).join()})
    GROUP BY m.id, m.name, m.image, m.releaseDate, m.category, m.directed, m.duration, m.casts, m.description, m.createdAt, m.updatedAt
    `, (err, res, field) => {
      if (err) reject(err)
      resolve(res)
    })
    console.log(query.sql)
  })
}

exports.getMovieUpComing = (cond) => {
  return new Promise((resolve, reject) => {
    db.query(`
    SELECT m.*, GROUP_CONCAT(DISTINCT g.name ORDER BY g.name DESC SEPARATOR ', ') AS genre 
    FROM movies m 
    LEFT JOIN movie_genre mg on m.id = mg.idMovie 
    LEFT JOIN genre g on mg.idGenre = g.id 
    WHERE m.name LIKE "%${cond.search}%" AND m.status = 'upComing'  ${cond.month ? `AND MONTH(m.releaseDate) = ${cond.month}` : ''}
    GROUP BY m.id, m.name, m.image, m.releaseDate, m.category, m.directed, m.duration, m.casts, m.description, m.createdAt, m.updatedAt
    ORDER BY ${cond.sort} ${cond.order}
    LIMIT ${cond.limit} OFFSET ${cond.offset}
    `, (err, res, field) => {
      if (err) reject(err)
      resolve(res)
    })
  })
}
