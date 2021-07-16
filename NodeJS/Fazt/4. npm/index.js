/* NPM = node package manager (Administrador de paquetes de Node) - Frameworks */
/* npmjs.com */
/* En el terminal poner por ejemplo npm install colores */

//Antes de correrlo debe instalarse los modulos de npm requeridos
//  npm install
//  npm i

//Para iniciar a aplicacion se puede hacer a traves de npm
//  npm start (lee del package.json)
//  npm run desarrollo (lee del package.json)

const colores = require('colors');

console.log('hola'.red);
console.log('mundo'.yellow);

const http = require('http');

const serverHandler = function(req, resp){
    resp.writeHead(200, {'Content-type':'text/html'});
    resp.write('<h1>Hola Mundo desde NodeJS - HTML estatico</h1>');

    resp.end();
}
const newServer = http.createServer(serverHandler);
newServer.listen(8080, function(){
    console.log('Servidor escuchando en el puerto 8080'.green);
});