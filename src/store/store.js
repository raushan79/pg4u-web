import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import pgReducer from './pgSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
     pg: pgReducer,
  },
});
