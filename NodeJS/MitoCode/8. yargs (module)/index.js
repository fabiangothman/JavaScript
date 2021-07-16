/*Como los args normales no permiten un formato del tipo valor=dato, aqui se puede usar la libreria Yargs
    npm install yargs --save

Ahora se corre el programa añadiendole algunos parametros
    node index.js --env=desarrollo --database=mysql
    node index.js --env desarrollo --database mysql
*/

const argv = require('yargs').argv;     //  .argv Almacena aqui los parametros enviados desde la terminal
console.log(argv);

console.log(`El entorno que se correrá es: ${argv.env}`);
console.log(`La base de datos que se correrá es: ${argv.database}`);