/* NPM = node package manager (Administrador de paquetes de Node) - Frameworks */
/* npmjs.com */

//Antes de correrlo debe instalarse los modulos de npm requeridos
//  npm install     npm i 

/* En el terminal poner por ejemplo npm install colores */

//Para iniciar a aplicacion se puede hacer a traves de npm
//  npm start (lee del package.json)
//  npm run desarrollo (lee del package.json)



const colores = require('colors');


/*const http = require('http');

const serverHandler = function(req, resp){
    resp.writeHead(200, {'Content-type':'text/html'});
    resp.write('<h1>Hola Mundo desde NodeJS - HTML estatico</h1>');

    resp.end();
}
const newServer = http.createServer(serverHandler);
newServer.listen(8080, function(){
    console.log('Servidor escuchando en el puerto 8080'.green);
});*/



/* Framework para crear servidores */
const expressjs = require ('express');
const server = expressjs();

server.get('/', (req, res) => {
    res.send('<h1>Hola con ExpressJS</h1>');
    res.end();
})

server.listen(8080, () => {
    console.log('Server port 8080'.red);
});