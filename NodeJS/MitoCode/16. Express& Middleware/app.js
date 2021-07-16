/*
    ExpressJS framework web (crear apps)
 */

const express = require('express');
const app = express();

let port = 3000;
//let isLogin = () => false;
let isLogin = () => true;

//Aqui esta el Middleware (Interceptor del request antes del response)
/*app.use((req, resp, siguiente) => {
    if(isLogin()){
        siguiente();    //Llamado a la siguiente linea de codigo despues de esta funcion (puede ser otro middleware)
    }else{
        resp.send(`No estás logueado: ${req.method} failed`);
    }
});*/
let peticion = (req, resp, next) => {
    console.log(`Peticion de tipo: ${req.method}`);
    next();
}
let showIP = (req, resp, next) => {
    console.log(`La IP es: ${req.ip}`);
    next();
}

app.use((req, resp, siguiente) => {
    if(isLogin()){
        siguiente();
    }else{
        resp.send(`No estás logueado: ${req.method} failed`);
    }
}, peticion, showIP);


app.get('/', (req, res) => {
    res.send(`Hola mundo! ${req.method}`);
});
app.get('/:user', (req, res) => {       //:user es una variable/parametro por URL
    let usr = req.params.user;
    res.send(`Bienvenido ${usr}!`);
});
app.post('/', (req, res) => {
    res.send(`Hola mundo! ${req.method}`);
});
app.put('/', (req, res) => {
    res.send(`Hola mundo! ${req.method}`);
});
app.delete('/', (req, res) => {
    res.send(`Hola mundo! ${req.method}`);
});

app.listen(port, () => {
    console.log(`Aplicacion corriendo por el puerto ${port}`);
});