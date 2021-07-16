/*
  #
*/

import './App.css';
import React, { useState } from 'react';

import tasks from './sample/tasks.json';
import TasksComponent from './components/TasksComponent';


let App = () => {   //  Lo que se está pintando dentro NO es HTML, es JSX !
  //const [tareas, setTareas] = useState(tasks);
  const [tareas] = useState(tasks);

  /*  Array.map()
        Array map recorre el array uno a uno y puede devolver un callback con NUEVO arreglo

        a = [1, 2, 3];
        b = a.map((unElemento)=>{
          unElemento + 1
        })
        console.log(b);   -->   [2, 3, 4]
  */

  return (
    <div>
      <TasksComponent tasks={tareas} />
    </div>
  );
}

export default App;
