/*
  props: Propiedades o properties
*/

import React from 'react';        //Biblioteca que permite crear interfaces
import ReactDOM from 'react-dom'; //Permite crear interfaces web
import './index.css';             //WebPack (Permite importar CSS en JS, y guardar cambios automaticos)
import App from './App';          //Importa el archivo y ese archivo puede heredar las librerias aqui importadas
import reportWebVitals from './reportWebVitals';

//ServiceWorker
//  ProgressiveApps (WebApps como Apps)

//Ejecuta la aplicación
//  React.StrictMode se puede usar en cualquier COMPONENTE para resaltar potenciales problemas.
//  Programacion por componentes: <App />
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

//Métricas y Analytics de la app
//reportWebVitals();
reportWebVitals(console.log);
