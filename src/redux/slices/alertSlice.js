import { v4 as uuidv4 } from 'uuid';
import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const alert = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    putAlert: (state, action) => {
      return [...state, action.payload];
    },
    removeAlert: (state, action) => {
      return state.filter((alert) => alert.id !== action.payload);
    },
  },
});

export const { putAlert, removeAlert, getUserSuccess } = alert.actions;

export const setAlert = (msg, alertType, timeout = 5000) => (dispatch) => {
  const id = uuidv4();
  dispatch(putAlert({ msg, alertType, id }));
  setTimeout(() => dispatch(removeAlert(id)), timeout);
};

export default alert.reducer;
