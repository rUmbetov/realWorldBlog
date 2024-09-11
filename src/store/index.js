import { configureStore } from '@reduxjs/toolkit';

import arcticleReducer from './arcticles';
import authReducer from './authSlice';

const store = configureStore({
  reducer: {
    article: arcticleReducer,
    auth: authReducer,
  },
});

export default store;
