function add(x1, x2){
    return x1 + x2;
}

function substract(x1, x2){
    return x1 - x2;
}

function multiply(x1, x2){
    return x1 * x2;
}

function divide(x1, x2){
    if(x2 === 0){
        console.log("No se puede dividir por cero");
    }else{
        return x1 / x2;
    }
}

/*exports.e_add = add;
exports.e_substract = substract;
exports.e_multiply = multiply;
exports.e_divide = divide;*/

/*const Math = {};
Math.add = add;
Math.substract = substract;
Math.multiply = multiply;
Math.divide = divide;

function hello(name){
    console.log("hola ${name}");
}
module.exports = hello;*/

module.exports = Math;
