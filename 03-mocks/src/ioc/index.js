const ioc = require('./container');
const stdoutLogger = require('./logger/stdout');

ioc.register('logger', function() {
  return stdoutLogger;
});

module.exports.mySpecialFunction = function() {
  const logger = ioc.make('logger');
  logger.error('some kind of error');
};
