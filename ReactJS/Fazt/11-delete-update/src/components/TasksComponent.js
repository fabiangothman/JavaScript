import React/*, { useState }*/ from 'react';
import TaskComponent from './TaskComponent'
import propTypes from 'prop-types';

let TasksComponent = (props) => {
    //const [tareas, setTareas] = useState(tasks);

   return(
      <div>
      {/* Aqui el .map retorna UN solo elemento por lo cual no se usan las llaves {} de multiples lineas. 
          ReactJS pide cuando se recorre un Array/lista que se ponga un KEY del elemento único    
      */}
      {props.tasks.map(elemento => <TaskComponent task={elemento}  deleteTask={props.deleteTask} changeDoneTask={props.changeDoneTask}  key={elemento.id} />)}
      </div>
   );
}

TasksComponent.propTypes = {
    tasks: propTypes.array.isRequired
}

export default TasksComponent;