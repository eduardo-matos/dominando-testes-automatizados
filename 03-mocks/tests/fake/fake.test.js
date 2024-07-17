const Cache = require('../../src/fake/cache/memory');
const { cacheSomething } = require('../../src/fake/fake');

test('caches something', async function () {
  const cache = new Cache();
  cacheSomething(cache);

  expect(await cache.get('foo')).toEqual('bar');
});
