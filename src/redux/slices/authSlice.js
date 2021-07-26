import { createSlice } from '@reduxjs/toolkit';
import api from '../../utils/api';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
  user: null,
};

const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.token = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
    },
    loginFailure: (state, action) => {
      state.token = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.user = null;
    },
    getUserSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.loading = false;
      state.user = action.payload;
    },
  },
});

export const { loginSuccess, loginFailure, getUserSuccess } = auth.actions;

export const loadUser = () => async (dispatch) => {
  try {
    const res = await api.get('/auth');
    dispatch(getUserSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};

export const login = (email, password) => async (dispatch) => {
  const body = { email, password };
  try {
    const res = await api.post('/auth', body);
    dispatch(loginSuccess(res.data.token));
    dispatch(loadUser());
  } catch (err) {
    dispatch(loginFailure());
  }
};

export const logout = () => async (dispatch) => dispatch(loginFailure());

export default auth.reducer;
