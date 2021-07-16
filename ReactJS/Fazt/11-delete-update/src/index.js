/*
  TaksApp: Crear una nueva aplicacion
*/

import React from 'react';        //Biblioteca que permite crear interfaces
import ReactDOM from 'react-dom'; //Permite crear interfaces web
import './index.css';             //WebPack (Permite importar CSS en JS, y guardar cambios automaticos)
import App from './App';          //Importa el archivo y ese archivo puede heredar las librerias aqui importadas
import reportWebVitals from './reportWebVitals';


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals(console.log);
