/*let promesa = new Promise((resolve, reject)=>{
    resolve('Éxito al procesar los datos');
});*/


/*let promesa = new Promise((res, rej)=>{
    //res('Éxito al procesar los datos');
    rej('Existe un error');
});
promesa.then((resul) => {
    console.log(resul);
});*/

/*let promesa = new Promise((res, rej)=>{
    //res('Éxito al procesar los datos');
    rej('Existe un error');
});
promesa.then((resul) => {
    console.log(resul);
}, (error) => {
    console.log(error);
});*/

const promesa = require('./promesa')

//Hace la petición a una promesa, y la controla (mas o menos como un try/catch)
promesa.calcular(3, 1).then((result) => {
    console.log(result);
}, (error) => {
    console.log(`Error: ${error}`);
});