const Logger = require('./logguer');

// Create a logger using evenets emitter
const logger = new Logger();
logger.on('message', (data) => console.log(`Called Event listener: `, data));
logger.log("Hello I'm a new log 1.")
logger.log("Hello I'm a new log 2.")
logger.log("Hello I'm a new log 3.")