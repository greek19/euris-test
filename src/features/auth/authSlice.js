import { createSlice } from '@reduxjs/toolkit';
import { persistor } from '../../features/store';  // Importa il persistor

const initialState = {
  user: null,  // L'utente sarà null se non è loggato
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
    resetState: () => initialState, // Nuova azione per reset del reducer
  },
});

export const { login, logout, resetState } = authSlice.actions;

export default authSlice.reducer;
