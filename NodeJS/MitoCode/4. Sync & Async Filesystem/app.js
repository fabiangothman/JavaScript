const fs = require('fs');

//Forma por defecto Asincronica
/*
console.log(`Proceso 1`)
fs.readFile('./data.txt', 'utf-8', (error, data) =>{
    if(error){
        console.log(`Error: ${error}`)
    }else{
        console.log(data)
        console.log(`Termina el proceso 2`)
    }
});
console.log(`Termina el proceso 3`)
*/

//Forma Sincronica
/*
console.log(`Proceso 1`)
let dataSync= fs.readFileSync('./data.txt', 'utf-8');
console.log(dataSync);
console.log(`Termina el proceso 2`)
console.log(`Termina el proceso 3`)
*/




//Forma por defecto Asincronica
/*
fs.rename('./data.txt', './data_renamed.txt', error => {
    if(error) throw error;
    console.log(`Renombrado!`);
})
*/

//Forma Sincronica
/*
let renamed = fs.renameSync('./data.txt', './data_renamed.txt');
*/




//Forma por defecto Asincronica
/*
fs.appendFile('./data.txt', '\nEste es un texto Adicionado.', error => {
    if(error) console.log(`Error: ${error}`)    
});
*/

//Forma Sincronica
/*
let added = fs.appendFileSync('./data.txt', '\nEste es un texto Adicionado.')
*/




//Forma por defecto Asincronica
/*
fs.unlink('data2.txt', error => {
    if(error) throw error;
    console.log(`Eliminado !`)
})
*/

//Forma Sincronica
/*
let added = fs.unlinkSync('./data.txt', '\nEste es un texto Adicionado.')
*/




//Forma por defecto Asincronica
/*
fs.readdir('../', (error, files) => {
    files.forEach(file => {
        console.log(file);
    });
})
*/

//Forma Sincronica
/*
let files = fs.readdirSync('../');
files.forEach(file => {
    console.log(file)
})
*/

fs.createReadStream('./data.txt').pipe(fs.createWriteStream('data3.txt'));