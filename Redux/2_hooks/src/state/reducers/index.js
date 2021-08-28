import { combineReducers } from "redux";
import accountReducer from "./accountReducer";

//Put here all reducers
const reducers = combineReducers({
    account: accountReducer
});
export default reducers;