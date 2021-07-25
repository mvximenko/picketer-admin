import { createSelectorHook } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';

const store = configureStore({ reducer: rootReducer });

export const useSelector = createSelectorHook();

export default store;
