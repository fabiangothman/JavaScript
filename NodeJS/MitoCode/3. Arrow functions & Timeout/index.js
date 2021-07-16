const fns = require('./functions');

setTimeout(() => {
    console.log('He terminado de ejecutarme delay.');
}, 2000);


let sum = fns.sumar(3, 4);
console.log(sum);

let rest = fns.restar(3, 4);
console.log(rest);

let mult = fns.multiplicar_10(3);
console.log(mult);