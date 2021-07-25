import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';

const rootReducer = combineReducers({
  auth: authReducer,
});

export default rootReducer;
