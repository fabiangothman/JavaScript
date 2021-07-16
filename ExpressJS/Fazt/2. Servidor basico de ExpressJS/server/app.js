/*
    Instalar express
        npm install express --save
*/

const { response } = require('express');
const express = require('express');
const app = express();      //Devuelve un objeto de tipo app o servidor

app.get('/', (req, res) => {
    res.send(`Hello world!`);
})

app.listen(3000, () => {
    console.log(`Server running on port 3000!`);
});