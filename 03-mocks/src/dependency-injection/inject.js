module.exports.Queue = class {
  publish(msg) {
    // send message to RabbitMQ or SQS or EventBus or Kafka or...
  }

  consume() {
    // gets a message from RabbitMQ or SQS or EventBus or Kafka or...
  }
}

module.exports.VeryImportantClass = class {
  constructor(queue) {
    this.queue = queue;
  }

  run() {
    // do something important
    this.queue.publish({ payload: 'Spam', validUntil: '2024-07-22 19:43:11' });
    // do more important things
  }
}
