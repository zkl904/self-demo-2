/**
 * redis连接
 */
// const config = require('../config/config');
const config = require('../config/config')
const Redis = require('ioredis')

const redisClient = new Redis({
	host: config.REDIS.host,
	port: config.REDIS.port,
	password: config.REDIS.password,
	db: config.REDIS.db
})

module.exports = redisClient;
