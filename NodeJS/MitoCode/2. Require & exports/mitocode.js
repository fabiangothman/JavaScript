//console.log('Suscribite al canal');

//let suscriptores = 22000;
//module.exports.suscriptores = suscriptores;

//module.exports.suscriptores = 22000;

/*function saludar(){
    console.log('Suscribete al canal desde funcion');
}
module.exports.saludar = saludar();*/

/*let suscriptores = 22000;
module.exports.saludar = () => {
    console.log('Suscribete al canal desde funcion');
};
module.exports.subs = suscriptores;*/

let suscriptores = 22000;
module.exports = {
    subs: suscriptores,
    saludar: () => {
        console.log('Holi export como objeto');
    },
    name: 'fabi'
}
console.log(module);