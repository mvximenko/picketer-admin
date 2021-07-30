import { createSlice } from '@reduxjs/toolkit';
import api from '../../utils/api';

const initialState = {
  user: null,
  users: [],
  loading: true,
  error: {},
};

const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getUsersSuccess: (state, action) => {
      state.users = action.payload;
      state.loading = false;
    },
    getUsersFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { getUsersSuccess, getUsersFailure } = user.actions;

export const getUsers = () => async (dispatch) => {
  try {
    const res = await api.get('/users');
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

export default user.reducer;
