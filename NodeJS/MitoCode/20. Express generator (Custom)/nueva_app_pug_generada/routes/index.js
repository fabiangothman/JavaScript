var express = require('express');
var router = express.Router();

/* GET home page. */
/*router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});*/

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

router.get('/', (req, res) => {
    res.render(
        'index',
        {titulo: 'Este es el titulo de Jade/Pug', mensaje:'Este es el mensaje de Jade/Pug', personas:personas}
    );
});

module.exports = router;
