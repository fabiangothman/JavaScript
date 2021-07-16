/*
    Instalar el módulo de Morgan (Es un MiddleWare para los request)
        npm install morgan
    
    Ejecutar aplicacion con nodemon
        nodemon ./app.js
        npx nodemon ./app.js    (si NO esta instlado en el sistema)
*/

const express = require('express');
const app = express();      //Devuelve un objeto de tipo app o servidor

const morgan = require('morgan');

//Usar el Middleware de Morgan en todos los request (Trae toda la data dependiendo el FORMATO que se indique: tyny, dev, combined, etc )
app.use(morgan('dev'));

//Middleware para que la aplicacion permita recibir JSON de entrada (convierte en json)
app.use(express.json());
//Es una especie de Middleware/Request para CUALQUIER/TODO un grupo de URLS
app.all('/user', (req, res, next) => {
    console.log(`Por aquí pasó y filtró antes de continuar con lo siguiente.`);
    next();
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


app.listen(3000, () => {
    console.log(`Server running on port 3000!`);
});