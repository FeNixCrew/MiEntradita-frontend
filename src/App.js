import './App.css';
import Main from './components/Main';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";


function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Redirect to="/main" />
        </Route>
        <Route path="/main" component={Main} />
      </Switch>
    </Router>

  );
}

export default App;
