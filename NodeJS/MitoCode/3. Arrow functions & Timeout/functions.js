//

module.exports = {
    sumar: (a, b) => {          //Definicion general cuando hay varias lineas
        let sum = a + b;
        return sum;
    },
    restar: (a, b) => a - b,        //Caso cuando hay solo una linea dentro de la funcion  
    multiplicar_10: a => a * 10    //Caso cuando hay un solo parametro
}