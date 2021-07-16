/*
    Instalar el modulo de pug
        npm install hbs --save (--save esta deprecated)
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
app.set('view engine', 'hbs');

app.get('/', (req, res) => {
    res.render(
        'template',
        {titulo: 'Este es el titulo de Handlebars/HBS', mensaje:'Este es el mensaje de Handlebars/HBS', personas:personas}
    );
});

app.listen(port, () => {
    console.log(`Aplicacion corriendo por el puerto ${port}`);
});