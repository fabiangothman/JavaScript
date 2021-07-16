/*
    React tiene ebebida una libreria llamada BABEL REPL que traduce el codigo de React a Código de JS puro 
*/

//import logo from './logo.svg';  //importa una imagen SVG
import './App.css';             //WebPack (Permite importar CSS en JS, y guardar cambios automaticos)

let HelloWorld = () => <div id="helloTitle">Hello world</div>

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
      <HelloWorld />
      <HelloWorld />
    </div>
  );
}

export default App;
