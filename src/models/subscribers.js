const db = require('../helpers/db')

exports.createSubscriber = (data = {}) => {
  return new Promise((resolve, reject) => {
    db.query(`
    INSERT INTO subscribers
    (${Object.keys(data).join()})
    VALUES
    (${Object.values(data).map(item => `"${item}"`).join(',')})
    `, (err, res, field) => {
      if (err) reject(err)
      resolve(res)
    })
  })
}

exports.getSubscriberByCondition = (cond) => {
  return new Promise((resolve, reject) => {
    const query = db.query(`
    SELECT * FROM subscribers WHERE ${Object.keys(cond).map(item => `${item}="${cond[item]}"`).join(' AND ')}
  `, (err, res, field) => {
      if (err) reject(err)
      resolve(res)
    })
    console.log(query.sql)
  })
}

exports.getAllSubscriber = () => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM subscribers', (err, res, field) => {
      if (err) reject(err)
      resolve(res)
    })
  })
}
