import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: 0,
};

export const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    increment: state => {
      state.value += 1;
    },
    updateTransaction: (state, action) => {
      state.transaction = action.payload;
    },
  },
});

export const { increment } = transactionsSlice.actions;

export default transactionsSlice.reducer;
