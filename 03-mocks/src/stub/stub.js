const config = require('./config');

module.exports.itDoesSomething = function() {
  config.console.log('This message should not appear during tests.');
};
