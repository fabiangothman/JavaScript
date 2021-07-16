import React/*, { useState }*/ from 'react';
import TaskComponent from './TaskComponent'

let TasksComponent = (props) => {
    //const [tareas, setTareas] = useState(tasks);

   return(
      <div>
      {/* Aqui el .map retorna UN solo elemento por lo cual no se usan las llaves {} de multiples lineas. 
          ReactJS pide cuando se recorre un Array/lista que se ponga un KEY del elemento único    
      */}
      {props.tasks.map(elemento => <TaskComponent task={elemento} key={elemento.id} />)}
      </div>
   );
}

export default TasksComponent;