import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import LogIn from './pages/LogIn';
import Register from './pages/Register';
import QrScan from './pages/QrScan';
import Home from './pages/Home';

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
