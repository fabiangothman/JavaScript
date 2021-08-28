import './App.css';
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "./state/index";

function App() {
  //const allState = useSelector((state) => state);
  const account = useSelector((state) => state.account);
  
  const dispatch = useDispatch();
  //const allActionCreators = bindActionCreators(actionCreators, dispatch);  //Contains all actions to be done
  const { depositMoney, withdrawMoney } = bindActionCreators(actionCreators, dispatch);


  return (
    <div className="App">
      <h1>{account}</h1>
      <button onClick={() => depositMoney(1000)}>Deposit</button>
      <button onClick={() => withdrawMoney(500)}>Withdraw</button>
    </div>
  );
}

export default App;
