/*
  Fetching data: Pedir datos de manera DINAMICA (Servidores externos) JSONPlaceholder
*/

import './App.css';
import React, { Component } from "react";

import tasks from './sample/tasks.json';

//Components
import TasksComponent from './components/TasksComponent';
import TaskFormComponent from './components/TaskFormComponent';
//Snippet: imp
import PostComponent from './components/PostComponent'


export default class App extends Component {
   state = {
      tareas: tasks
   }

   addNewTask = (newTask) => {
      const lastElemId = (this.state.tareas.length === 0) ? 0 : this.state.tareas[this.state.tareas.length - 1].id;
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

   deleteTask = (taskId) => {
      //la funcion FILTER retorna un nuevo array dependiendo de un Filtro
      const nonDeletedTasks = this.state.tareas.filter(task => task.id!==taskId);
      this.setState(
         {
            tareas: nonDeletedTasks
         }
      );
   }

   changeDoneTask = (taskId) => {
      const updatedTasks = this.state.tareas.map(task => {
         if(task.id === taskId)
            task.done = !task.done
         return task
      });

      this.setState(
         {
            tareas: updatedTasks
         }
      );
   }

   render(){
      return(
         <div>
            <TaskFormComponent addNewTask={this.addNewTask} />
            <TasksComponent tasks={this.state.tareas} deleteTask={this.deleteTask} changeDoneTask={this.changeDoneTask} />
            <PostComponent />
         </div>
      );
   }
}

//export default App;
