/*
    Instalar el modulo de pug   (Antes llamado Jade)
        npm install pug --save (--save esta deprecated)
*/

const express = require('express');
const app = express();

const port = 3000;

let personas = [
    {
        id: 1,
        nombre: 'Fabian'
    },
    {
        id: 2,
        nombre: 'Pepe'
    },{
        id: 3,
        nombre: 'Juanita'
    }
]

//Asocia el motor de plantilla que usará el código
app.set('view engine', 'pug');

app.get('/', (req, res) => {
    res.render(
        'template',
        {titulo: 'Este es el titulo de Jade/Pug', mensaje:'Este es el mensaje de Jade/Pug', personas:personas}
    );
});

app.listen(port, () => {
    console.log(`Aplicacion corriendo por el puerto ${port}`);
});