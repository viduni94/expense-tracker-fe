import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: 0,
};

export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {},
});

export default dashboardSlice.reducer;
