const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const dotenv = require('dotenv')

dotenv.config()
const { APP_PORT } = process.env
const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(morgan('dev'))
app.use(cors('*'))

app.use('/uploads', express.static('uploads'))

app.use('/movies', require('./src/routes/movies'))
app.use('/cinemas', require('./src/routes/cinemas'))
app.use('/genre', require('./src/routes/genre'))
app.use('/showtimes', require('./src/routes/showtimes'))
app.use('/auth', require('./src/routes/auth'))
app.use('/users', require('./src/routes/users'))
app.use('/seats', require('./src/routes/seats'))
app.use('/transaction', require('./src/routes/transaction'))

app.listen(APP_PORT, () => {
  console.log(`App is running on port ${APP_PORT}`)
})
