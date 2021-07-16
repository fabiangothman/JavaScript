/*
  Los propTypes son basicamente los tipos de datos de los PROPS
*/

import './App.css';
import React, { Component } from "react";

import tasks from './sample/tasks.json';

//Components
import TasksComponent from './components/TasksComponent';
import TaskFormComponent from './components/TaskFormComponent';


export default class App extends Component {
   state = {
      tareas: tasks
   }

   addNewTask = (newTask) => {
      const lastElemId = this.state.tareas[this.state.tareas.length - 1].id;
      newTask = {
         id: lastElemId + 1,
         title: newTask.titulo,
         description: newTask.descripcion,
         done: true
      }
      
      //Concatenas un objeto con otro
      this.setState(
         {
            tareas: [...this.state.tareas, newTask]
         }
      );
      console.log(this.state);
   }

   render(){
      return(
         <div>
            <TaskFormComponent addNewTask={this.addNewTask} />
            <TasksComponent tasks={this.state.tareas} />
         </div>
      );
   }
}

//export default App;
