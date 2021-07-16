/*
    Para hacer debugging se corre la aplicacion asi:
        node inspect app.js
    
    Ya estando en el debuguer:
        n       pasa a la siguiente linea

        repl    para entrar a ver los valores del punto en el que estamos parados
                curso   digitando eso vamos a ver el valor que tiene esa variable en ese punto
                Ctrl+C  Se sale del repl

        c       ejecuta todo (o hasta el proximo debugger;)
        list(numero)    muestra esa cantidad de lineas del codigo

    Punto de interrupcion o breakpoint
        debugger;       Se pone esto dentro del codigo que queremos detener
        c               Vamos al siguiente debugger; puesto en el codigo
        
*/

let curso = 'nodeJS';
curso = 'Node.JS';
curso = 'Aprendizaje de Node.JS';
curso = 'Aprendizaje de Node.JS con debugger';
console.log(curso);
debugger;
x = () => {
    let val1 = 3;
    let val2 = 2;
    let suma = val1 + val2;
    debugger;
    return suma;
}
console.log(x);
console.log(x());

const extr = require('./extra.js');
extr.saludar();