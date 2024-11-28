import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { productsApi } from './products/productsApi';
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from 'redux-persist';
import authReducer from './auth/authSlice'; 

// Configurazione di redux-persist
const persistConfig = {
  key: 'root', // Chiave principale per la persistenza
  storage,     // Specifica il tipo di storage (default: Local Storage)
};

const rootReducer = combineReducers({
  [productsApi.reducerPath]: productsApi.reducer,
  auth: authReducer, // Combina il reducer di autenticazione
});

// Applica il persistReducer al rootReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configura lo store Redux con il persistedReducer
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disattiva i controlli di serializzabilità di redux-persist
    }).concat(productsApi.middleware),
});

export const persistor = persistStore(store);
