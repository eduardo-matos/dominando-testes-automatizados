const ioc = require('../../src/ioc/container');
const dummyLogger = require('../../src/ioc/logger/dummy');
const { mySpecialFunction } = require('../../src/ioc/index');

beforeAll(() => {
  ioc.register('logger', function () {
    return dummyLogger;
  });
});

it('changes dependency on the fly', () => {
  mySpecialFunction();
});
