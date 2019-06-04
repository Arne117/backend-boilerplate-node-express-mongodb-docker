/* globals requireWrapper */

/** This module defines the mongoose schema for an example
 *
 * @author Arne Rolf
 *
 * @module models/example/index.js
 * @type {mongoose schema}
 **/

// For simple secrets
// require('dotenv').config()

const {
  MONGO_USERNAME,
  MONGO_PASSWORD,
  MONGO_HOSTNAME,
  MONGO_PORT,
  MONGO_DATABASE_NAME
} = process.env

const mongoose = require('mongoose')
const logger = requireWrapper('helpers/logger')

const Schema = mongoose.Schema
const ExampleSchema = new Schema(
  {
    title: { type: String, required: true },
    hasNewProperty: { type: String }
  },
  {
    _id: true,
    collection: 'Examples',
    timestamps: true
  }
)

const mongooseOptions = {
  useNewUrlParser: true,
  useFindAndModify: false,
  socketTimeoutMS: 0,
  keepAlive: true,
  autoReconnect: true,
  reconnectTries: Number.MAX_VALUE,
  reconnectInterval: 1000
}

let connectionString = `mongodb://${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DATABASE_NAME}`

if (!!MONGO_USERNAME && !!MONGO_PASSWORD) {
  connectionString = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DATABASE_NAME}?authSource=admin`
}

mongoose.Promise = global.Promise

logger.info('MongoDB: trying initial connection')

const db = mongoose.createConnection()

db.on('error', e => logger.error(`MongoDB: ${e}`))
db.on('connected', e => logger.info(`MongoDB: is connected`))
db.on('disconnecting', () => logger.warn('MongoDB: is disconnecting!'))
db.on('disconnected', () => logger.warn('MongoDB: is disconnected!'))
db.on('reconnected', () => logger.info(`MongoDB: is reconnected`))
db.on('timeout', e => logger.warn(`MongoDB: timeout ${e})`))
db.on('close', () => logger.warn('MongoDB: connection closed'))

db.openUri(connectionString, mongooseOptions)

module.exports = db.model('Example', ExampleSchema)
