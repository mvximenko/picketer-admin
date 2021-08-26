import { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import store from './redux/store';
import { loadUser } from './redux/slices/authSlice';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './components/auth/Login';
import Post from './components/post/Post';
import Posts from './components/posts/Posts';
import Users from './components/users/Users';
import UserForm from './components/user-form/UserForm';
import PostForm from './components/post-form/PostForm';
import PrivateRoute from './components/routing/PrivateRoute';
import setAuthToken from './utils/setAuthToken';
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
      <ToastContainer />
      <Switch>
        <PrivateRoute exact path='/' component={Posts} />
        <PrivateRoute exact path='/posts/:id' component={Post} />
        <PrivateRoute exact path='/edit-post/:id' component={PostForm} />
        <PrivateRoute exact path='/create-post' component={PostForm} />
        <PrivateRoute exact path='/users' component={Users} />
        <PrivateRoute exact path='/user/:id' component={UserForm} />
        <PrivateRoute exact path='/create-user' component={UserForm} />
        <Route exact path='/login' component={Login} />
      </Switch>
    </>
  );
}
