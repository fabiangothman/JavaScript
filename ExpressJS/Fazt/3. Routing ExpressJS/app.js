/*
    Instalar express
        npm install express --save

    Instalar nodemoon   (para no estar ejecutando a cada rato)
        npm install nodemon --save      (Esto NO es necesario si ya esta instalado a nivel de sistema)

    Ejecutar aplicacion con nodemon
        nodemon ./app.js
        npx nodemon ./app.js    (si NO esta instlado en el sistema)
*/

const { response } = require('express');
const express = require('express');
const app = express();      //Devuelve un objeto de tipo app o servidor

/*app.get('/', (req, res) => {
    res.send(`This a ${req.method} request!`);
});
app.post('/about', (req, res) => {
    res.send(`This a ${req.method} request!`);
});
app.put('/contact', (req, res) => {
    res.send(`This a ${req.method} request!`);
});
app.delete('/test', (req, res) => {
    res.send(`This a ${req.method} request!`);
});*/


/*app.get('/user1', (req, res) => {
    res.send(`{"username":"Fabian","lastname":"Murillo"}`);
});
app.get('/user', (req, res) => {
    res.json({
        username: 'Fabian',
        lastname: 'Murillo'
    });
});
*/

//Middleware para que la aplicacion permita recibir JSON de entrada
app.use(express.json());
//Es una especie de Middleware/Request para CUALQUIER/TODO un grupo de URLS
app.all('/user', (req, res, next) => {
    console.log(`Por aquí pasó y filtró antes de continuar con lo siguiente.`);
    next();
});

app.get('/user', (req, res) => {
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