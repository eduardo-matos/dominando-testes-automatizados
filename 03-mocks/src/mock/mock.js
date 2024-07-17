module.exports.itDoesSomethingElse = function(callback) {
  if (typeof callback === 'function') {
    return callback(1, 2, 3);
  }
};
