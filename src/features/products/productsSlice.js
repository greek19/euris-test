import { createSlice } from '@reduxjs/toolkit';

const productsSlice = createSlice({
  name: 'products',
  initialState: { layout: 'panel' },
  reducers: {
    toggleLayout: (state) => {
      state.layout = state.layout === 'panel' ? 'grid' : 'panel';
    },
  },
});

export const { toggleLayout } = productsSlice.actions;
export default productsSlice.reducer;
