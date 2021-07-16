/*Modulo de sistema operativo*/
const os = require('os');

console.log(os.arch());
console.log(os.platform());
console.log(os.freemem());
console.log(os.totalmem());

/*Modulo de archivos (filesystem)*/
const fs = require('fs');

/*Codigo asincrono*/
fs.writeFile('./archivoAsincronico.txt', 'linea 1', function(err){
    if(err)
        console.log(err);
    console.log('Archivo Asincronico (Async) creado');
});

/*Codigo bloqueante*/
const bloq = fs.writeFile('./archivoBloqueante.txt', 'linea 1', function(err){
    if(err)
        console.log(err);
    console.log('Archivo Bloqueante (Async) creado');
});

console.log('result de bloq:'+bloq);
console.log('ultima linea sincronica');

fs.readFile('./archivoAsincronico2.txt', function(err, data){
    if(err)
        console.log(err);
    else
        console.log(data.toString());
});
