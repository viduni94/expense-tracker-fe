import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: 0,
};

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
});

export default categoriesSlice.reducer;
