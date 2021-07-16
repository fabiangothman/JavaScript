/*
    Instalar la dependencia de request
        npm install request --save  (--save ya esta obsoleto)


    Inciar la aplicacion con parametros args
        node geocode.js --direccion='Bogotá, Colombia'

    Como la aplicacion usa los servicios de google es necesario tener el key y facturacion activada en la cuenta
 */

 const request = require('request');
 const argv = require('yargs').argv;

 let direccion = argv.direccion;
 let url = `https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyC7bVMsXN_Yl9aTIbrhEph3_KwQy_KD7WY&address=${direccion}`;
 
 /*request('http://google.com', (error, response, body) => {
    console.log('Error: ', error);      //Error if occurred
    console.log('Response: ', response);      //Response
    console.log('StatusCode: ', response && response.statusCode);   //statuscode if response was received
    console.log('Body: ', body);    //Print HTML
 });*/

 request({
     url:url,
     json:true,
 }, (error, response, body) => {
    //console.log(body);
    //console.log(JSON.stringify(body, undefined, 2));
    
    /*console.log(JSON.stringify(body.results[0].formatted_address));
    console.log(JSON.stringify(body.results[0].geometry.location.lat));
    console.log(JSON.stringify(body.results[0].geometry.location.lng));*/

    if(error){
        console.log('Servicio no disponible');
    }else if(body.status === 'ZERO_RESULTS'){
        console.log('No hay datos a mostrar');
    }else if(body.status === 'OK'){
        console.log(JSON.stringify(`Dirección: ${body.results[0].formatted_address}`));
        console.log(JSON.stringify(`Latitud: ${body.results[0].geometry.location.lat}`));
        console.log(JSON.stringify(`Longitud: ${body.results[0].geometry.location.lng}`));
    }
    
 });