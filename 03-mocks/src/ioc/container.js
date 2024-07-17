const container = {};

module.exports = {
  register(name, constructor) {
    container[name] = constructor;
  },

  make(name) {
    if(container[name]) {
      return container[name]();
    }

    throw new Error(`${name} not registered`);
  }
}
