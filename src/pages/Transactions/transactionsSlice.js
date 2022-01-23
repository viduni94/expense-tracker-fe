import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: 0,
};

export const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    updateTransaction: (state, action) => {
      state.transaction = action.payload;
    },
  },
});

export default transactionsSlice.reducer;
