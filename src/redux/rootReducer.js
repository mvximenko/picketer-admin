import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import postReducer from './slices/postSlice';
import userReducer from './slices/userSlice';
import reportReducer from './slices/reportSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  post: postReducer,
  user: userReducer,
  report: reportReducer,
});

export default rootReducer;
