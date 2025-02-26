const http = require('http')

var options = {
  timeout: 2000,
  host: 'localhost',
  port: process.env.PORT || 8081,
  path: '/healthcheck' // must be the same as HEALTHCHECK in Dockerfile
}

var request = http.request(options, res => {
  console.info('STATUS: ' + res.statusCode)
  process.exitCode = (res.statusCode === 200) ? 0 : 1
  process.exit()
})

request.on('error', err => {
  console.error('ERROR', err)
  process.exit(1)
})

request.end()