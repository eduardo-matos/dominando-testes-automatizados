const redis = require('redis');
const RedisCache = require('../../../src/fake/cache/redis');

let oldCreateClient;

beforeEach(() => {
  oldCreateClient = redis.createClient;
  redis.createClient = jest.fn();
  redis.createClient.mockReturnValue({
    on: jest.fn(),
    set: jest.fn(),
    del: jest.fn(),
    get: jest.fn(),
  });
});

afterEach(() => {
  redis.createClient = oldCreateClient;
});

it('sets a value in redis', function() {
  const cache = new RedisCache();
  cache.put('something', 'there');

  expect(cache.client.set).toHaveBeenCalledWith('something', 'there');
});

it('gets a value in redis', async function() {
  const cache = new RedisCache();
  cache.client.get.mockResolvedValue('spam');

  const result = cache.get('some key');

  expect(cache.client.get).toHaveBeenCalledWith('some key');
  expect(await result).toEqual('spam');
});

it('deletes a value in redis', function() {
  const cache = new RedisCache();
  cache.del('something');

  expect(cache.client.del).toHaveBeenCalledWith('something');
});
