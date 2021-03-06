import { createSlice } from '@reduxjs/toolkit';
import api from '../../utils/api';

const initialState = {
  user: {
    name: '',
    surname: '',
    patronymic: '',
    email: '',
    role: '',
    password: '',
  },
  users: [],
  loading: true,
  error: null,
};

const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getUsersStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getUsersSuccess: (state, action) => {
      state.users = action.payload;
      state.loading = false;
    },
    getUsersFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    getUserSuccess: (state, action) => {
      state.user = action.payload;
      state.loading = false;
    },
    updateUser: (state, action) => {
      state.user[action.payload.name] = action.payload.value;
    },
    resetUser: (state) => {
      state.user = initialState.user;
    },
  },
});

export const {
  getUsersStart,
  getUsersSuccess,
  getUsersFailure,
  getUserSuccess,
  updateUser,
  resetUser,
} = user.actions;

export const getUsers = (query) => async (dispatch) => {
  try {
    const res = await api.get(query ? `/users/${query}` : '/users');
    dispatch(getUsersSuccess(res.data));
  } catch (err) {
    dispatch(
      getUsersFailure({
        msg: err.response.statusText,
        status: err.response.status,
      })
    );
  }
};

export const getUser = (id) => async (dispatch) => {
  try {
    dispatch(getUsersStart());
    const res = await api.get(`/users/user/${id}`);
    dispatch(getUserSuccess(res.data));
  } catch (err) {
    dispatch(
      getUsersFailure({
        msg: err.response.statusText,
        status: err.response.status,
      })
    );
  }
};

export default user.reducer;
