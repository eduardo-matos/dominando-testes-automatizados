const redis = require('redis');

module.exports = class {
  constructor() {
    this.client = redis.createClient()

    this.client.on('error', (err) => {
      throw new Error(`Redis error: ${err}`);
    });
  }

  async put(key, value) {
    return await this.client.set(key, value);
  }

  async del(key) {
    return await this.client.del(key);
  }

  async get(key) {
    return await this.client.get(key);
  }
}
