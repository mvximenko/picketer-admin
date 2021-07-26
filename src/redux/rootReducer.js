import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import alertReducer from './slices/alertSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  alert: alertReducer,
});

export default rootReducer;
