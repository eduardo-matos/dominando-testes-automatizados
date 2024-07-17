const User = require('./user');

const UserRepository = {
  async all() {
    return await User.findAll();
  },

  async byId(id) {
    return await User.findByPk(id);
  },

  async create(name, email) {
    const newUser = await User.create({ name, email });
    return newUser.id;
  },

  async del(id) {
    await User.destroy({
      where: { id },
    });
  },
}

module.exports = UserRepository;
