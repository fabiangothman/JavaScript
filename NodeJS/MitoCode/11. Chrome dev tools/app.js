/*
    chrome://inspect
    
    Empezar el proyecto para depurarlo en su modo ESCUCHA
        node --inspect-brk app.js

    Para debuguear en el navegador sin tener que estar guardando cambios
        nodemon --inspect-brk app.js

    En chrome dale en "Open dedicated toold for node"
        
*/

let curso = 'nodeJS';
curso = 'Node.JS';
curso = 'Aprendizaje de Node.JS';
curso = 'Aprendizaje de Node.JS con debugger';
console.log(curso);
debugger;
x = () => {
    let val1 = 3;
    let val2 = 7;
    let suma = val1 + val2;
    debugger;
    return suma;
}
console.log(x);
console.log(x());

const extr = require('./extra.js');
extr.saludar();