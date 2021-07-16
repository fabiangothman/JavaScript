/*
  Se pueden definir los STATE en funciones (ARROW y NORMALES) en vez de Clases
*/

import './App.css';
import React, { useState } from 'react';

function HelloWorld(props) {
  // Declare a new state variable, which we'll call "mostrar"
  const [mostrar, setMostrar] = useState(false);
  
  if(mostrar){
    return (
      <div id="helloContainer">
        <h3>{props.myTitle}</h3>
        <p>{props.myText}</p>
        <button onClick={() => setMostrar(!mostrar)}>Toggle component state</button>
      </div>
    );
  }else{
    return(
      <div id="helloContainer">
        <p>The component is not Enabled in its state</p>
        <button onClick={() => setMostrar(!mostrar)}>Toggle component state</button>
      </div>
    );
  }
}

let App = () => {   //  Lo que se está pintando dentro NO es HTML, es JSX !
  return (
    <div>
      <p>This is what my components says: </p>
      <HelloWorld myTitle="Hello World #1" myText="Este es un llamado desde el componente #1" />
      <HelloWorld myTitle="Hello World #2" myText="Este es un llamado desde el componente #2" />
      <HelloWorld myTitle="Hello World #3" myText="Este es un llamado desde el componente #3" />
    </div>
  );
}

export default App;
