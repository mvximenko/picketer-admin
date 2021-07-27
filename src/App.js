import { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import store from './redux/store';
import { loadUser } from './redux/slices/authSlice';
import setAuthToken from './utils/setAuthToken';
import Login from './components/auth/Login';
import Posts from './components/posts/Posts';
import PrivateRoute from './components/routing/PrivateRoute';
import { GlobalStyle } from './GlobalStyles';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

export default function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <>
      <GlobalStyle />
      <Switch>
        <PrivateRoute exact path='/' component={Posts} />
        <Route exact path='/login' component={Login} />
      </Switch>
    </>
  );
}
