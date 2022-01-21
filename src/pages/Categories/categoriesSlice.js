import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: 0,
};

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    increment: state => {
      state.value += 1;
    },
  },
});

export const { increment } = categoriesSlice.actions;

export default categoriesSlice.reducer;
