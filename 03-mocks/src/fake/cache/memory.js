module.exports = class {
  constructor() {
    this.store = {};
  }

  async put(key, value, ttl) {
    this.store[key] = value;
  }

  async del(key) {
    if (this.store[key]) {
      delete this.store[key];
    }
  }

  async get(key) {
    return this.store[key];
  }
}
