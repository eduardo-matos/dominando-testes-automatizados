module.exports.cacheSomething = async function (cache) {
  return await cache.put('foo', 'bar', 0);
};
