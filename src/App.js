import { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import store from './redux/store';
import { loadUser } from './redux/slices/authSlice';
import setAuthToken from './utils/setAuthToken';
import Login from './components/auth/Login';
import Posts from './components/posts/Posts';
import Users from './components/users/Users';
import UserForm from './components/user-form/UserForm';
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
        <PrivateRoute exact path='/users' component={Users} />
        <PrivateRoute exact path='/user/:id' component={UserForm} />
        <Route exact path='/login' component={Login} />
      </Switch>
    </>
  );
}
