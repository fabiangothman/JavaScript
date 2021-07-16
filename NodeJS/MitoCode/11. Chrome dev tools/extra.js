var mensaje = 'Estamos Debugueando';

let saludar = () => {
    debugger;
    mensaje = mensaje+" adicional";
    debugger;
    console.log(mensaje);
}

module.exports = {
    saludar: saludar
}