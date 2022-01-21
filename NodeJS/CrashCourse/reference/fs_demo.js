const fs = require('fs');
const path = require('path');

// Create a folder
/*fs.mkdir(path.join(__dirname, 'test'), {}, (err) => {
    if(err) throw err;
    console.log('Folder created');
});*/

// Create and write to file
fs.writeFile(path.join(__dirname, 'test', 'hello.txt'), 'Hey there! 1', (err) => {
    if(err) throw err;
    console.log('File created and written');
});

// Create and write to file (Overwrite)
fs.writeFile(path.join(__dirname, 'test', 'hello.txt'), 'I love JS 2', (err) => {
    if(err) throw err;
    console.log('File created and written');
});



// Create and write to file (Append)
fs.writeFile(path.join(__dirname, 'test', 'hello.txt'), 'I love JS 3', (err) => {
    if(err) throw err;
    console.log('File created and written');

    fs.appendFile(path.join(__dirname, 'test', 'hello.txt'), 'I love JS 3.1', (err) => {
        if(err) throw err;
        console.log('File created and appended 2');
    });
    
});

// Read file
fs.readFile(path.join(__dirname, 'test', 'hello.txt'), 'utf8', (err, data) => {
    if(err) throw err;
    console.log('data: ', data);
});


// Rename file
fs.rename(path.join(__dirname, 'test', 'hello.txt'), path.join(__dirname, 'test', 'hello2.txt'), (err) => {
    if(err) throw err;
    console.log('File renamed');
});
