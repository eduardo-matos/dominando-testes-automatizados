const UserRepository = require('./userRepository');

module.exports.makeUser = async function (name, email) {
  return await UserRepository.create(name, email);
}
