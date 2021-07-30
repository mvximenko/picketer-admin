import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import alertReducer from './slices/alertSlice';
import postReducer from './slices/postSlice';
import userReducer from './slices/userSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  alert: alertReducer,
  post: postReducer,
  user: userReducer,
});

export default rootReducer;
