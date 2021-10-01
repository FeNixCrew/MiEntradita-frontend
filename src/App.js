import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import LogIn from './pages/LogIn'
import Register from "./pages/Register";
import QrScan from "./pages/QrScan";
import Home from './pages/Home';

import { isScanner, isLogin, isAdmin } from "./helpers/usedFunctions";
import Search from "./pages/Search";


const PrivateRoute = ({ isAuth, component: Component, ...rest }) => {
  return (
    <Route {...rest} render={props => (
      isAuth() ?
        <Component {...props} /> :
        <Redirect to="/login" />
    )} />
  )
}

function Error() {
  return <p>Error!</p>
}

function NotFound() {
  return <p>404 not found!</p>
}

const Routes = () => (
  <Router>
    <Switch>
      <Route exact path="/">
        <Redirect to="/login" />
      </Route>
      <PrivateRoute component={Home} path="/:username/home" isAuth={isLogin} />
      <PrivateRoute component={QrScan} path="/scanner" isAuth={isScanner} />
      <PrivateRoute component={Home} path="/admin/home" isAuth={isAdmin} />
      <PrivateRoute component={Search} path="/:username/search" isAuth={() => isAdmin() || isLogin()} />
      <Route component={Error} path="/error"/>
      <Route path="/login" component={LogIn} />
      <Route path="/register" component={Register} />
      <Route component={NotFound} path="*"/>
    </Switch>
  </Router>
);

export default function App() {
  return (<Routes />);
}
