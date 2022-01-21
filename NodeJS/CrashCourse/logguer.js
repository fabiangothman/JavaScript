const EventEmitter = require('events');
const uuid = require('uuid');

// Generate random unique UUID
//console.log(uuid.v4());

// Create emitter class
class Logger extends EventEmitter {
    log(msg) {
        // Call event
        this.emit('message', {
            id: uuid.v4(),
            msg
        });
    }
}

module.exports = Logger;
