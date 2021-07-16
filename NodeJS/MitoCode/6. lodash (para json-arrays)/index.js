const _ = require('lodash');    //El _ es una recomendacion de la documentacion de lodash

let x = {'nombre':'Paola'}
let y = {'apodo':'Pao'}
let z = [
    {nombre:'Eduar', apellido:'Murillo', edad:26},
    {nombre:'Fabian', apellido:'Asturias', edad:96},
    {nombre:'Fabian', apellido:'Rodriguez', edad:26},
    {nombre:'Fabian', apellido:'Mendoza', edad:16}
]

//Unir dos objetos js de manera normal:
/*
JSON.parse()
JSON.stringify()
*/

//Unir dos objetos js con lodash (Se simplifica mucho)
/*
let resul = _.assign(x, y);
console.log(resul);
*/




//Ejecutar una funcion n veces de manera normal
/*
ciclo for o foreach
 */

//Ejecutar una funcion n veces con lodash (Se simplifica mucho)
/*
_.times(3, () => console.log(`Ejecutado`))
*/




//Buscar primer elemento dentro de un array
let resul = _.find(z, {nombre:'Fabian', edad:26})
console.log(resul);