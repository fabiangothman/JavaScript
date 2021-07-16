/*
    Nodemoon sirve para guardar los cambios y no tener que volver a ejecutar siempre
    Es util para ambientes de desarrollo para no estar ejecutando a cada rato: p.e:  node app.js

    Para instalarlo se hace mediante:
        npm install -g nodemon

    Se utiliza igual que el node:
        para correr un programa     nodemon app.js

    Aqui tambien se puede hacer debugg:

        nodemon inspect app.js
        
*/

let curso = 'nodeJS';
curso = 'Node.JS';
curso = 'Aprendizaje de Node.JS';
curso = 'Aprendizaje de Node.JS con debugger';
console.log(curso);
debugger;
x = () => {
    let val1 = 3;
    let val2 = 6;
    let suma = val1 + val2;
    debugger;
    return suma;
}
console.log(x);
console.log(x());

const extr = require('./extra.js');
extr.saludar();