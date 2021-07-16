/*
    Instalar el modulo de motor de plantilla EJS (Embedded JavaScript templates)
        npm install ejs
    
    Ejecutar aplicacion con nodemon
        nodemon ./app.js
        npx nodemon ./app.js    (si NO esta instlado en el sistema)
*/

const express = require('express');
const app = express();      //Devuelve un objeto de tipo app o servidor

const morgan = require('morgan');

//Server Settings       se comporta de la forma: (variable, valor) y se puede leer con app.get(variable)
    // Ver el app.listen
app.set('AppName', 'Fazt ExpressJS Tuto');
app.set('port', 3000);
//Hay nombres de variables reservados
//Asocia el motor de plantilla que usará el código
app.set('view engine', 'ejs');


//Usar el Middleware de Morgan en todos los request (Trae toda la data dependiendo el FORMATO que se indique: tyny, dev, combined, etc )
app.use(morgan('dev'));

//Middleware para que la aplicacion permita recibir JSON de entrada (convierte en json)
app.use(express.json());
//Es una especie de Middleware/Routes requests para CUALQUIER/TODO un grupo de URLS
app.all('/user', (req, res, next) => {
    console.log(`Por aquí pasó y filtró antes de continuar con lo siguiente.`);
    next();
});


app.get('/', (req, res) => {
    console.log(`Request ${req.method} called!`);
    const db_data = [
        {name: 'Fabi', lastname:'Muri'},
        {name: 'John', lastname:'Smith'},
        {name: 'Paula', lastname:'Casas'}
    ];
    //En vez de mostrar algo en pantalla, se va a renderizar un template
    res.render('index.ejs', {people: db_data});
});
app.get('/user', (req, res) => {
    console.log(`Request ${req.method} called!`);
    //res.send(`This a ${req.method} request!`);
    res.json({
        username: 'Fabian',
        lastname: 'Murillo'
    });
});
app.post('/user', (req, res) => {
    console.log(req.body);                      //Recibe lo que se envia por BODY
    //res.send(`This a ${req.method} request!`);
    res.json(req.body);
});
app.delete('/user/:userId', (req, res) => {
    console.log(req.params);

    //res.send(`This a ${req.method} request!`);
    let userId = req.params.userId;         //Recibe lo que se envia por URL
    res.send(`User ${userId} deleted!`);
});
app.put('/user/:userId', (req, res) => {
    console.log(req.params);
    console.log(req.body);

    //res.send(`This a ${req.method} request!`);
    let userId = req.params.userId;         //Recibe lo que se envia por URL
    res.send(`User with id ${userId} updated!`);
});


app.use(express.static('public'));  //Agrega un middleware para permitir solo contenidos ESTATICOS dentro de la capeta 'public'


app.listen(app.get('port'), () => {
    console.log(app.get('AppName'));
    console.log(`Server running on port ${app.get('port')}!!`);
});