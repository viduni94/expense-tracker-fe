import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: 0,
};

export const budgetSlice = createSlice({
  name: 'budget',
  initialState,
  reducers: {
    increment: state => {
      state.value += 1;
    },
  },
});

export const { increment } = budgetSlice.actions;

export default budgetSlice.reducer;
