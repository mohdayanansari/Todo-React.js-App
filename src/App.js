import TodoComponent from "./TodoManger";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./Login";


function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Login}></Route>
        <Route exact path="/todo" component={TodoComponent}></Route>

      </Switch>
    </BrowserRouter>
  );
}

export default App;
