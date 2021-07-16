/*
    React tiene ebebida una libreria llamada BABEL REPL que traduce el codigo de React a Código de JS puro 
*/

//import logo from './logo.svg';  //importa una imagen SVG
import './App.css';             //WebPack (Permite importar CSS en JS, y guardar cambios automaticos)
import React from 'react';

/*let HelloWorld = (props) => <div id="helloContainer">
  <h3>{props.myTitle}</h3>
  <p>{props.myText}</p>
</div>*/

class HelloWorld extends React.Component {
  //Define el state, es una palabra reservada
  state = {
    mostrar: true
  }

  cambiarEstadoMethod(){
    this.setState({mostrar: !this.state.mostrar});  //Establece un valor a la propiedad, niega el valor que sea que tenga (contrario)
  }

  cambiarEstadoFunction = () => {
    this.setState({mostrar: !this.state.mostrar});  //Establece un valor a la propiedad, niega el valor que sea que tenga (contrario)
  }

  //Método/Palabra reservada para renderizar un componente de React
  render(){
    if(this.state.mostrar){
      return(
        <div id="helloContainer">
          <h3>{this.props.myTitle}</h3>
          <p>{this.props.myText}</p>
          {/*<button onClick={this.cambiarEstadoMethod.bind(this)}>Toggle component state</button>*/}
          <button onClick={this.cambiarEstadoFunction}>Toggle component state</button>
        </div>
      );
    }else{
      return(
        <div id="helloContainer">
          <p>The component is not Enabled in its state</p>
          <button onClick={this.cambiarEstadoFunction}>Toggle component state</button>
        </div>
      );
    }
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
