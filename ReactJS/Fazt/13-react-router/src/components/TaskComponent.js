import React/*, { useState }*/ from 'react';
import './Task.css';
import propTypes from 'prop-types';

let TaskComponent = (props) => {
    //const [tareas, setTareas] = useState(tasks);
   const {task} = props;    //Extrae solo el dato TASK del PROPS para abreviar y ya no estar llamando siempre a props.tasks.*
   const boxStyles = {
       color: 'black',
       margin: '15px',
       padding: '10px',
       border: '1px solid black'
    }

    return(
        <div className="bg-skyblue" style={boxStyles}>
            <div style={taskCompeted(task.done)}>
                <h3>{task.title}</h3>
                <div>
                    <div>Id: {task.id}</div>
                    <div>Description: {task.description}</div>
                    <div>Done: {task.done}</div>
                    <input type="checkbox" onChange={props.changeDoneTask.bind(this, task.id)} />
                    <button style={btnDeleteStyles} onClick={props.deleteTask.bind(this, task.id)}>x</button>
                </div>
            </div>
        </div>
    );
}

//Aqui valida que el objeto que reciba sea el adecuado (de tipo object) y sea obligatorio
TaskComponent.propTypes = {
    task: propTypes.object.isRequired
}

const taskCompeted = (isDone) => {
    //Retorna un objeto de JS
    return {
        fontSize: '20px',
        color: (isDone) ? 'black' : 'grey',
        textDecoration: (isDone) ? 'none' : 'line-through',
    }
}

const btnDeleteStyles = {
    fontSize: '18px',
    backgroundColor: 'red',
    color: 'white',
    border: 'none',
    padding: '10px 15px',
    borderRadius: '50%',
    cursor: 'pointer'

}

export default TaskComponent;