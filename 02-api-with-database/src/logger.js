const config = require('./config');

module.exports = logger = require('pino')();

logger.level = config.LOG_LEVEL;
