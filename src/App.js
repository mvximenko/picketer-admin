import { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import { loadUser } from './redux/slices/authSlice';
import setAuthToken from './utils/setAuthToken';
import Login from './components/auth/Login';
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
      <Provider store={store}>
        <Switch>
          <Route exact path='/login' component={Login} />
        </Switch>
      </Provider>
    </>
  );
}
