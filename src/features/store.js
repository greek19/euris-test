import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { productsApi } from './products/productsApi';
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from 'redux-persist';
import authReducer from './auth/authSlice'; 

// Configurazione di redux-persist
const persistConfig = {
  key: 'root', 
  storage,     
};

const rootReducer = combineReducers({
  [productsApi.reducerPath]: productsApi.reducer,
  auth: authReducer, 
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, 
    }).concat(productsApi.middleware),
});

export const persistor = persistStore(store);
