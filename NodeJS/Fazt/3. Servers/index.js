//Para iniciar a aplicacion se puede hacer a traves de node
//  node index.js


const http = require('http');
//console.log(http);

/*http.createServer(function(req, resp){
    //resp.writeHead(200, {'Content-type':'text/html'});
    //resp.write('<h1>Hola Mundo desde NodeJS - HTML estatico</h1>');

    resp.writeHead(200, {'Content-type':'text/plain'});
    resp.write('<h1>Este es un texto estatico plano</h1>');

    resp.end();
}).listen(8080);*/

const serverHandler = function(req, resp){
    resp.writeHead(200, {'Content-type':'text/html'});
    resp.write('<h1>Hola Mundo desde NodeJS - HTML estatico</h1>');

    resp.end();
}
const newServer = http.createServer(serverHandler);
newServer.listen(8080, function(){
    console.log('Servidor escuchando en el puerto 8080');
});