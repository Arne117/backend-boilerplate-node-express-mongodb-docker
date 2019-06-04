/* globals requireWrapper */

// For simple secrets
// require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const helmet = require('helmet')
const cors = require('cors')
const path = require('path')

const app = express()
app.use(helmet())
app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors())

global.requireWrapper = moduleName => {
  return require(path.join(`${__dirname}/${moduleName}`))
}

const logger = requireWrapper('helpers/logger')
const apiV1 = requireWrapper('api/v1/')

const port = process.env.PORT || 8081

app.use('/api/v1', apiV1)
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.send('Hello Docker World!')
})

app.get('/healthcheck', (req, res) => {
  // do app logic here to determine if app is truly healthy
  // you should return 200 if healthy, and anything else will fail
  // if you want, you should be able to restrict this to localhost (include ipv4 and ipv6)
  res.status(200)
})

// Error handling
app.use((err, req, res, next) => {
  logger.error(err)
  res.status(500).json({ 'error': { 'message': 'Something went wrong!', 'code': 500 } })
})

app.use((req, res, next) => {
  res.status(404).json({ 'error': { 'message': 'Page missing!', 'code': 404 } })
})

const server = app.listen(port, err => {
  if (err) logger.error(`Error on startup http: ${err}`)
  else logger.info(`Listening http on port: ${port}`)
})

process.on('unhandledRejection', err => logger.error(err.stack))

module.exports = { server }
