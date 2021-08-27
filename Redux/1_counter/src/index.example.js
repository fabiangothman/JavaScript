import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createStore } from "redux";

//  THE NEXT 4 STEPS ARE THE REDUX STEPS


/**
 * ACTION: Function/Method with name
 * Describes what you want to do
 */
const increment = () => {
  return {
    type: 'INCREMENT'
  }
}
const decrement = () => {
  return {
    type: 'DECREMENT'
  }
}


/**
 * REDUCER: Store of actions
 * Describes how ACTION transform the STORE into a next state
 */
const counter = (state = 0, action) => {
  switch(action.type){
    case "INCREMENT":
      return state+1;
      //break;
    case "DECREMENT":
      return state-1;
      //break;
  }
}


/**
 * STORE: Globalized state
 * Component who contains all Data, for other components
 */
 let store = createStore(counter);


//Just add a listener to display the next executed actions
store.subscribe(() => console.log(store.getState()));


/**
 * DISPATCH: Execute
 * Executes the ACTION (Send action to the REDUCER)
 */
store.dispatch(increment());
store.dispatch(decrement());
store.dispatch(decrement());


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
