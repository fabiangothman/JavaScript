import { createStore, applyMiddleware, compose } from "redux";
import reducers from "./reducers";
import thunk from "redux-thunk";    //To support async functions

//To support ReduxDevTools Chrome plugin
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const myStore = createStore(
    reducers,
    composeEnhancers(applyMiddleware(thunk))
)