const http = require('http');

// Create a server object
http.createServer((req, res) => {
    //Write response
    res.write('Hello there from server!');
    res.end();
}).listen(5000, () => console.log('Server running'));
