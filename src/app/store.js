import { configureStore } from '@reduxjs/toolkit';
import { productsApi } from '../features/products/productsApi';
import authReducer from '../features/auth/authSlice'; 

export const store = configureStore({
  reducer: {
    [productsApi.reducerPath]: productsApi.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware),
});