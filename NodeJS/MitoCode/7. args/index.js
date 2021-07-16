//Se pueden recibir parametros en la aplicacion a traves de los args de consola (comandos)

//Asi mostramos los parametros que esta recimiendo a aplicacion
let all_params = process.argv;
console.log(all_params);

/*Se pueden enviar mas parametros a travez de la terminal para recibirlos aca, asi:
    node index.js desarrollo/produccion mysql/mariadb
*/
let param_2 = process.argv[2];
console.log(param_2);
if(param_2 === "desarrollo"){
    console.log(`Codigo ejecutado para env desarrollo`)
}

let param_3 = process.argv[3];
console.log(param_3);
if(param_3 === "mysql"){
    console.log(`Codigo ejecutado sera compatible para mysql`)
}
