/*
    React tiene ebebida una libreria llamada BABEL REPL que traduce el codigo de React a Código de JS puro 
*/

//import logo from './logo.svg';  //importa una imagen SVG
import './App.css';             //WebPack (Permite importar CSS en JS, y guardar cambios automaticos)

let HelloWorld = (propiedades) => <div id="helloContainer">
  <h3>{propiedades.myTitle}</h3>
  <p>{propiedades.myText}</p>
</div>

/*
// Necesita importarse React
class HelloWorld2 extends React.Component {
  render(){
    return <div id="">Hello world 2</div>
  }
}*/

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
