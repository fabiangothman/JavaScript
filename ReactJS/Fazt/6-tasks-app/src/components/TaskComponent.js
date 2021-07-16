import React/*, { useState }*/ from 'react';

let Task = (props) => {
    //const [tareas, setTareas] = useState(tasks);
   const {task} = props;    //Extrae solo el dato TASK del PROPS para abreviar y ya no estar llamando siempre a props.tasks.*

    return(
        <div>
            <h1>{task.title}</h1>
            <div>
                <div>Id: {task.id}</div>
                <div>Description: {task.description}</div>
                <div>Done: {task.done}</div>
                <input type="checkbox" />
                <button>x</button>
            </div>
        </div>
    );
}

export default Task;