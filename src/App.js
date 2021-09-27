import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import LogIn from './components/Login'
import Register from "./components/Register";
import QrScan from "./components/Scanner";
import Home from './components/User';

const Routes = () => (
  <Router>
      <Switch>
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
        <Route path="/user/:username" component={Home} />
        <Route path="/scanner" component={QrScan} />
        <Route path="/login" component={LogIn} />
        <Route path="/register" component={Register} />
      </Switch>
    </Router>
);

export default function App() {
  return (<Routes />);
}
