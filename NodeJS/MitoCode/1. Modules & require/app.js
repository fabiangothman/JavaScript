/*
let => global
const => constante
var => local
*/
const os = require('os');

let cpu = os.cpus();
let platform = os.platform();
let hostname = os.hostname();

/*console.log(cpu);
console.log(platform);
console.log(hostname);*/


const fs = require ('fs');
let cpu_String = JSON.stringify(cpu);
let data = `Información del CPU: ${cpu_String}`; //String templates
fs.appendFile('mitocode.txt', data, (error) =>{
    if(error){
        console.log('Error al crear archivo');
    }
});