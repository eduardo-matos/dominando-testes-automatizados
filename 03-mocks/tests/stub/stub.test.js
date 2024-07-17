const config = require('../../src/stub/config');
const { itDoesSomething } = require('../../src/stub/stub');

let oldConsole;

beforeAll(() => {
  oldConsole = config.console;
  config.console = { log: function(){} };
});

afterAll(() => {
  config.console = oldConsole;
});

test('stubbing console log', () => {
  itDoesSomething();
});
