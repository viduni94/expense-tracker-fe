import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: 0,
};

export const spendingSlice = createSlice({
  name: 'spending',
  initialState,
  reducers: {
    increment: state => {
      state.value += 1;
    },
  },
});

export const { increment } = spendingSlice.actions;

export default spendingSlice.reducer;
