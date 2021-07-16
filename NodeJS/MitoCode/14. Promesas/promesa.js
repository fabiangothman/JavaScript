/*
    resp    retorna una respuesta exitosa
    reje    retorna un rechazo, "rejected"
 */

let calcular = (num1, num2) => {
    return new Promise((resp, reje) => {        
        
        //Para simular el delay en una respuesta
        setTimeout(() => {
            let suma = num1+num2;
            if(suma > 5){
                resp(suma)
            }else{
                reje('Error al procesar los datos')
            }
        }, 3000);
    });
}

module.exports = {
    //calcular: calcular
    calcular    //Como se llaman igual es lo mismo que calcular: calcular
}