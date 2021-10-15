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
import Error from './pages/Error'
import Search from "./pages/Search";
import CreateMatch from "./pages/CreateMatch";
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './style/style';

import { isScanner, isLogin, isAdmin, NotFoundMessage, ServerErrorMessage } from "./helpers/usedFunctions";

const PrivateRoute = ({ isAuth, component: Component, ...rest }) => {
  return (
    <Route {...rest} render={props => (
      isAuth() ?
        <Component {...props} /> :
        <Redirect to="/login" />
    )} />
  )
}

const ErrorRoute = ({ statusCode, errorMessage, ...rest }) => {
  return (
    <Route {...rest} render={props => (
      <Error statusCode={statusCode} errorMessage={errorMessage} />
    )} />
  );
}

const Routes = () => (
  <Router>
    <Switch>
      <Route exact path="/">
        {
          isLogin() ?
            (isScanner() && <Redirect to="scanner" />) ||
            <Redirect to={`/${localStorage.username}/home`} />
            :
            <Redirect to="/login" />
        }
      </Route>
      <PrivateRoute component={Home} path="/:username/home" isAuth={isLogin} />
      <PrivateRoute component={QrScan} path="/scanner" isAuth={isScanner} />
      <PrivateRoute component={Home} path="/admin/home" isAuth={isAdmin} />
      <PrivateRoute component={CreateMatch} path="/admin/add-match" isAuth={isAdmin} />
      <PrivateRoute component={Search} path="/:username/search" isAuth={() => isAdmin() || isLogin()} />
      <Route path="/login" component={LogIn} />
      <Route path="/register" component={Register} />
      <ErrorRoute statusCode={503} errorMessage={ServerErrorMessage} path="/error" />
      <ErrorRoute statusCode={404} errorMessage={NotFoundMessage} path="*" />
    </Switch>
  </Router>
);

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Routes />
    </ThemeProvider>
  );
}
