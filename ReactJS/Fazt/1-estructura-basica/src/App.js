/*
    React tiene ebebida una libreria llamada BABEL REPL que traduce el codigo de React a Código de JS puro 
*/

//import logo from './logo.svg';  //importa una imagen SVG
import './App.css';             //WebPack (Permite importar CSS en JS, y guardar cambios automaticos)

let CualquierNombre = () => {   //  Lo que se está pintando dentro NO es HTML, es JSX !
  return (
    <div>Hello world</div>
  );
}

export default CualquierNombre;
