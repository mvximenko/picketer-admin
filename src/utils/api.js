import axios from 'axios';
import store from '../redux/store';
import { loginFailure } from '../redux/slices/authSlice';

const api = axios.create({
  baseURL:
    process.env.NODE_ENV === 'production'
      ? 'https://picketer.herokuapp.com/api/'
      : 'http://localhost:5000/api/',
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response.data.msg === 'Token is not valid') {
      store.dispatch(loginFailure());
    }
    return Promise.reject(err);
  },
);

export default api;
