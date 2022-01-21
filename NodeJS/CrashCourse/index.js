const http = require('http');
const path = require('path');
const fs = require('fs');

// Create a new server object
const server = http.createServer((req, res) => {

  /*if(req.url === '/'){
      fs.readFile(path.join(__dirname, 'public', 'index.html'), (err, data) => {
          if(err) throw err;
          res.writeHead(200, {
              'Content-Type': 'text/html'
          });
          res.end(data);
      });
      
  }
  
  if(req.url === '/api/users'){
      const users = [
          {name: 'Name1', age: 23},
          {name: 'Name2', age: 56},
          {name: 'Name3', age: 30},
      ];
      res.writeHead(200, {
          'Content-Type': 'application/json'
      });
      res.end(JSON.stringify(users));
  }*/

  // Build file path dynamic
  let filePath = path.join(__dirname, 'public', req.url === '/' ? 'index.html' : req.url);

  // Extension of file
  let extName = path.extname(filePath);

  // Initial contentType
  let contentType = "text/html";

  // Check extension and set contentType
  switch (extName) {
    case '.js':
      contentType = 'text/javascript';
      break;
    case '.css':
      contentType = 'text/css';
      break;
    case '.json':
      contentType = 'application/json';
      break;
    case '.png':
      contentType = 'image/png';
      break;
    case '.jpg':
      contentType = 'image/jpg';
      break;
    default:
      contentType = 'text/html';
      break;
  }

  // Read file and load
  fs.readFile(filePath, (err, data) => {
    if (err) {
      if (err.code == 'ENOENT') {
        // Page not found
        fs.readFile(path.join(__dirname, 'public', '404.html'), (err, data) => {
          if (err) throw err;
          res.writeHead(200, {
            'Content-Type': 'text/html'
          });
          res.end(data, 'utf8');
        });
      } else {
        // Some server error
        res.writeHead(500);
        res.end(`Server error: ${err.code}`);
      }
    } else {
      // Success
      res.writeHead(200, {
        'Content-Type': contentType
      });
      res.end(data, 'utf8');
    }
  })
});
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
