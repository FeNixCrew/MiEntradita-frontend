import './App.css';
import Main from './components/Main/Main';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import LogIn from './components/login/LogIn';
import Home from './components/user/Home';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
        <Route path="/me" component={Home} />
        <Route path="/user/:username" component={Main} />
        <Route path="/login" component={LogIn} />
  
      </Switch>
    </Router>

  );
}

export default App;
