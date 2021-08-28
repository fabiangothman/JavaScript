# Sample Application
Sample Application build using Redux & ReactJS
- npx create-react-app 2_hooks --template redux

## Libraries
To implement Redux:
- npm install redux react-redux
To support asynchronous
- npm install redux-thunk

## "Steps" explanation
- ACTION: Function/Method with name
    - Describes what you want to do
- REDUCER: Store of actions
    - Describes how ACTION transform the STORE into a next state
- STORE: Globalized state
    - Component who contains all Data, for other components
- DISPATCH: Execute
    - Executes the ACTION (Send action to the REDUCER)