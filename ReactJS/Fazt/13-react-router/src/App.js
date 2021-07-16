/*
  Fetching data: Pedir datos de manera DINAMICA (Servidores externos) JSONPlaceholder
*/

import './App.css';
import React, { Component } from 'react';

/*Instalar React Router
      npm install react-router-dom
*/
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

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
            <Router>
               <div style={{paddingBottom:'10px'}}>
                  <div>Con React-Router-Link:</div>
                  <div style={{marginLeft:'20px'}}>
                     <div>
                        <Link to="/">Home</Link>
                     </div>
                     <div>
                        <Link to="/posts">Posts</Link>
                     </div>
                  </div>
               </div>

               <div style={{paddingTop:'10px'}}>
                  <div>Con JSX:</div>
                  <div style={{marginLeft:'20px'}}>
                     <div>
                        <a href="/">Home</a>
                     </div>
                     <div>
                     <a href="/posts">Posts</a>
                     </div>
                  </div>
               </div>


               <Route exact path="/" render={() => {
                  console.log("Llama a los componentes de task");
                  return <div>
                     <TaskFormComponent addNewTask={this.addNewTask} />
                     <TasksComponent tasks={this.state.tareas} deleteTask={this.deleteTask} changeDoneTask={this.changeDoneTask} />
                  </div>
               }}>
               </Route>

               {/* Manera alternativa de llamar */}
               <Route path="/posts" component={PostComponent} />
            </Router>
            
         </div>
      );
   }
}

//export default App;
