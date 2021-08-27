import { useSelector, useDispatch } from "react-redux";
import { increment, decrement } from "./actions";

function App() {
  const counter = useSelector(state => state.counter);
  const isLogged = useSelector(state => state.isLogged);

  const dispatch = useDispatch();

  return (
    <div className="App">
      <h1>Counter: {counter}</h1>
      <button onClick={() => dispatch(increment(6))}>+</button>
      <button onClick={() => dispatch(decrement(3))}>-</button>

      {isLogged ? <h3>This is a valuable information I shouldn't see!</h3>: ''}
    </div>
  );
}

export default App;
