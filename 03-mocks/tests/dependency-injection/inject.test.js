const { VeryImportantClass } = require('../../src/dependency-injection/inject');

class FakeQueue {
  constructor() {
    this.queue = [];
  }
  publish(msg) {
    this.queue.push(msg);
  }

  consume() {
    return this.queue.shift();
  }
}

test('caches something', async function () {
  const queue = new FakeQueue();
  const vic = new VeryImportantClass(queue);

  vic.run();

  expect(await queue.consume()).toEqual({ payload: 'Spam', validUntil: '2024-07-22 19:43:11' });
});
