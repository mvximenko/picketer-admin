import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import alertReducer from './slices/alertSlice';
import postReducer from './slices/postSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  alert: alertReducer,
  post: postReducer,
});

export default rootReducer;
