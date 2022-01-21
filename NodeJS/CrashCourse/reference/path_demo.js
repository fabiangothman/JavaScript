const path = require('path');

// Base file name
console.log(__filename);
console.log(path.basename(__filename));

// Director name
console.log(path.dirname(__filename));

// Director extension
console.log(path.extname(__filename));

// Create path object
console.log(path.parse(__filename));
console.log(path.parse(__filename).base);

// Concatenate paths (Solve problems with delimiters [/, //, ///])
console.log(path.join(__filename, 'text', 'hello.txt'));
