// Usually used to create Loggers
const EventEmitter = require('events');

// Create emitter class
class MyEmitter extends EventEmitter {
}

// init object
const myEmitter = new MyEmitter();

// Event listener
myEmitter.on('event', () => console.log('Event fired'));

// Init event
myEmitter.emit('event');
myEmitter.emit('event');
myEmitter.emit('event');
