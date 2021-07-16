const fetch = require('node-fetch');

/*
//Retorna una promesa
let promesa = fetch('https://api.github.com/users/mitocode21');
promesa.then((resul) => {
    console.log(resul);
}, (error) => {
    //
});
*/


//Para convertir a JSON se puede usar la funcion .json() del resultado
let promesa = fetch('https://api.github.com/users/mitocode21');
let res = promesa.then((resul) => {
    return resul.json();
}, (error) => {
    //
});
//res esta retornando una promesa
res.then((json_res) => {
    console.log(json_res);
}, (error) => {
    //
});