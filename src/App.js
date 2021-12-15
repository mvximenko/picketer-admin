import { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import store, { useSelector } from './redux/store';
import { loadUser, loginFailure } from './redux/slices/authSlice';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './components/auth/Login';
import Post from './components/post/Post';
import Posts from './components/posts/Posts';
import Users from './components/users/Users';
import AddUser from './components/user-forms/AddUser';
import EditUser from './components/user-forms/EditUser';
import AddPost from './components/post-forms/AddPost';
import EditPost from './components/post-forms/EditPost';
import PrivateRoute from './components/routing/PrivateRoute';
import Navbar from './components/navbar/Navbar';
import setAuthToken from './utils/setAuthToken';
import { GlobalStyle } from './GlobalStyles';

export default function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
      store.dispatch(loadUser());
    } else {
      store.dispatch(loginFailure());
    }
  }, []);

  return (
    <>
      <GlobalStyle />
      <ToastContainer />
      {isAuthenticated && <Navbar />}
      <Switch>
        <PrivateRoute exact path='/' component={Posts} />
        <PrivateRoute exact path='/posts/:id' component={Post} />
        <PrivateRoute exact path='/edit-post/:id' component={EditPost} />
        <PrivateRoute exact path='/create-post' component={AddPost} />
        <PrivateRoute exact path='/users' component={Users} />
        <PrivateRoute exact path='/user/:id' component={EditUser} />
        <PrivateRoute exact path='/create-user' component={AddUser} />
        <Route exact path='/login' component={Login} />
      </Switch>
    </>
  );
}
