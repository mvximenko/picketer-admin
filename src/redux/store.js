import { createSelectorHook } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';
import setAuthToken from '../utils/setAuthToken';

const store = configureStore({ reducer: rootReducer });

let currentState = store.getState();

store.subscribe(() => {
  let previousState = currentState;
  currentState = store.getState();

  if (previousState.auth.token !== currentState.auth.token) {
    const token = currentState.auth.token;
    setAuthToken(token);
  }
});

export const useSelector = createSelectorHook();

export default store;
